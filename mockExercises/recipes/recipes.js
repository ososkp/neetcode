class RecipeSite {
    constructor() {
        this.users = {};
        this.recipes = {};
        this.recipeNames = new Set();
        this.globalRecipeCount = 0;
    }

    createUser(timestamp, userId) {
        if (this.users[userId]) return false;

        this.users[userId] = {
            userId: userId,
            recipeCount: 0,
            ratingSum: 0,
            ratingCount: 0
        }

        return true;
    }

    createRecipe(timestamp, userId, name) {
        if (!this.users[userId] ||
            this.recipeNames.has(name.toLowerCase())) {
            return null;
        }

        this.globalRecipeCount++;
        this.recipeNames.add(name.toLowerCase());
        this.users[userId].recipeCount++;
        const recipeId = `recipe${this.globalRecipeCount}`;

        this.recipes[recipeId] = {
            creatorId: userId,
            recipeId: recipeId,
            name: name.toLowerCase()
        };


        return recipeId;
    }

    rateRecipe(timestamp, userId, recipeId, rating) {
        if (rating < 1 || rating > 5) return false;

        const recipeIdLower = recipeId.toLowerCase();

        if (!this.users[userId]
            || !this.recipes[recipeIdLower]
            || this.recipes[recipeIdLower].creatorId === userId) {
            return false;
        }


        const recipe = this.recipes[recipeIdLower];

        this.users[recipe.creatorId].ratingSum += rating;
        this.users[recipe.creatorId].ratingCount++;

        return true;
    }

    getTopChefs(timestamp, n) {
        const chefs = Object.values(this.users);

        chefs.sort((a, b) => {
            const averageA = a.ratingCount > 0 ? a.ratingSum / a.ratingCount : 0;
            const averageB = b.ratingCount > 0 ? b.ratingSum / b.ratingCount : 0;

            return (averageA !== averageB)
                ? averageB - averageA
                : a.userId.localeCompare(b.userId);
        })

        return chefs.slice(0, n)
            .map(chef => {
                return `${chef.userId}(${this.globalRecipeCount},${chef.recipeCount})`
            });
    }
}

module.exports = RecipeSite;