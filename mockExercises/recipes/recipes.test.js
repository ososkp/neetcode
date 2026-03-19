const RecipeSite = require('./recipes');

describe("RecipeSite: Part 1 Operations", () => {
    let site;

    beforeEach(() => {
        // Reset the system before every test to ensure clean state
        site = new RecipeSite();
    });

    describe("createUser", () => {
        test("should successfully create a new user", () => {
            expect(site.createUser(1, "ChefGordon")).toBe(true);
            expect(site.users["ChefGordon"]).toBeDefined();
        });

        test("should return false if the user already exists", () => {
            site.createUser(1, "ChefGordon");

            // Try to create the exact same user
            expect(site.createUser(2, "ChefGordon")).toBe(false);
        });
    });

    describe("createRecipe", () => {
        beforeEach(() => {
            // Pre-populate a user for recipe tests
            site.createUser(1, "ChefGordon");
            site.createUser(2, "ChefJamie");
        });

        test("should return null if the user does not exist", () => {
            expect(site.createRecipe(3, "GhostChef", "Burger", "Beef, Bun")).toBeNull();
        });

        test("should return recipe1 for the first successful recipe", () => {
            expect(site.createRecipe(4, "ChefGordon", "Burger", "Beef, Bun")).toBe("recipe1");
        });

        test("should return monotonically increasing recipe IDs across different users", () => {
            expect(site.createRecipe(5, "ChefGordon", "Burger", "Beef, Bun")).toBe("recipe1");
            expect(site.createRecipe(6, "ChefJamie", "Salad", "Lettuce, Tomato")).toBe("recipe2");
            expect(site.createRecipe(7, "ChefGordon", "Soup", "Broth, Chicken")).toBe("recipe3");
        });

        test("should return null if the exact recipe name already exists", () => {
            site.createRecipe(8, "ChefGordon", "Burger", "Beef, Bun");

            // Same chef, same name
            expect(site.createRecipe(9, "ChefGordon", "Burger", "More Beef")).toBeNull();
            // Different chef, same name
            expect(site.createRecipe(10, "ChefJamie", "Burger", "Vegan Beef")).toBeNull();
        });

        test("should return null if the recipe name exists (CASE INSENSITIVE check)", () => {
            site.createRecipe(11, "ChefGordon", "Spicy Chicken", "Chicken, Spice");

            // Try different variations of capitalization
            expect(site.createRecipe(12, "ChefJamie", "SPICY CHICKEN", "Chicken, Spice")).toBeNull();
            expect(site.createRecipe(13, "ChefJamie", "spicy chicken", "Chicken, Spice")).toBeNull();
            expect(site.createRecipe(14, "ChefJamie", "sPiCy ChIcKeN", "Chicken, Spice")).toBeNull();
        });

        test("should properly increment the user's personal recipeCount", () => {
            site.createRecipe(15, "ChefGordon", "Pizza", "Dough, Cheese");
            site.createRecipe(16, "ChefGordon", "Pasta", "Noodles, Sauce");

            expect(site.users["ChefGordon"].recipeCount).toBe(2);
            expect(site.users["ChefJamie"].recipeCount).toBe(0);
        });
    });

    describe("rateRecipe", () => {
        beforeEach(() => {
            // Setup a clean state with two users and one recipe
            site.createUser(1, "ChefGordon");
            site.createUser(2, "FoodCritic");
            site.createRecipe(3, "ChefGordon", "Beef Wellington", "Beef, Pastry");
            // The created recipeId will be "recipe1"
        });

        test("should successfully rate a recipe and update the CREATOR'S stats", () => {
            expect(site.rateRecipe(4, "FoodCritic", "recipe1", 5)).toBe(true);

            // Check that Gordon got the rating, not the Critic
            expect(site.users["ChefGordon"].ratingSum).toBe(5);
            expect(site.users["ChefGordon"].ratingCount).toBe(1);

            // Critic's stats should remain untouched
            expect(site.users["FoodCritic"].ratingSum).toBe(0);
        });

        test("should accumulate ratings correctly for the same creator", () => {
            site.rateRecipe(4, "FoodCritic", "recipe1", 4);
            site.rateRecipe(5, "FoodCritic", "recipe1", 5);

            expect(site.users["ChefGordon"].ratingSum).toBe(9);
            expect(site.users["ChefGordon"].ratingCount).toBe(2);
        });

        test("should return false if the user rating the recipe does not exist", () => {
            expect(site.rateRecipe(6, "GhostCritic", "recipe1", 5)).toBe(false);
        });

        test("should return false if the recipe does not exist", () => {
            expect(site.rateRecipe(7, "FoodCritic", "recipe999", 5)).toBe(false);
        });

        test("should return false if the rating is less than 1", () => {
            expect(site.rateRecipe(8, "FoodCritic", "recipe1", 0)).toBe(false);
            expect(site.rateRecipe(9, "FoodCritic", "recipe1", -3)).toBe(false);
        });

        test("should return false if the rating is greater than 5", () => {
            expect(site.rateRecipe(10, "FoodCritic", "recipe1", 6)).toBe(false);
            expect(site.rateRecipe(11, "FoodCritic", "recipe1", 100)).toBe(false);
        });

        test("should return false if a user tries to rate their own recipe", () => {
            // "recipe1" belongs to "ChefGordon"
            expect(site.rateRecipe(12, "ChefGordon", "recipe1", 5)).toBe(false);

            // Verify his stats didn't change
            expect(site.users["ChefGordon"].ratingSum).toBe(0);
            expect(site.users["ChefGordon"].ratingCount).toBe(0);
        });
    });
    describe("getTopChefs", () => {
        beforeEach(() => {
            // Setup a complex state for the leaderboard
            site.createUser(1, "Alice");
            site.createUser(2, "Bob");
            site.createUser(3, "Charlie");

            // Global recipe count will be 3
            site.createRecipe(4, "Alice", "Cake", "Flour, Sugar");
            site.createRecipe(5, "Bob", "Steak", "Meat");
            site.createRecipe(6, "Charlie", "Salad", "Leaves");
        });

        test("should sort by average rating descending", () => {
            site.createUser(7, "Judge");

            // Alice gets a 5. Average = 5.0
            site.rateRecipe(8, "Judge", "recipe1", 5);
            // Bob gets two 4s. Average = 4.0
            site.rateRecipe(9, "Judge", "recipe2", 4);
            site.rateRecipe(10, "Judge", "recipe2", 4);
            // Charlie gets a 2. Average = 2.0
            site.rateRecipe(11, "Judge", "recipe3", 2);

            const top = site.getTopChefs(12, 3);
            expect(top).toEqual([
                "Alice(3,1)",
                "Bob(3,1)",
                "Charlie(3,1)"
            ]);
        });

        test("should use alphabetical order as a tie-breaker", () => {
            site.createUser(7, "Judge");

            // Alice and Bob both get 5s. (Tie)
            site.rateRecipe(8, "Judge", "recipe1", 5);
            site.rateRecipe(9, "Judge", "recipe2", 5);

            // Charlie gets a 3.
            site.rateRecipe(10, "Judge", "recipe3", 3);

            // Alice should be before Bob because 'A' comes before 'B'
            const top = site.getTopChefs(11, 3);
            expect(top).toEqual([
                "Alice(3,1)",
                "Bob(3,1)",
                "Charlie(3,1)"
            ]);
        });

        test("should limit the output to 'n' chefs", () => {
            site.createUser(7, "Judge");
            site.rateRecipe(8, "Judge", "recipe1", 5); // Alice: 5
            site.rateRecipe(9, "Judge", "recipe2", 4); // Bob: 4
            site.rateRecipe(10, "Judge", "recipe3", 3); // Charlie: 3

            // Only ask for top 2
            const top = site.getTopChefs(11, 2);
            expect(top).toEqual([
                "Alice(3,1)",
                "Bob(3,1)"
            ]);
        });
    });
});