var Table = function(ingredients) {
    if(!ingredients) {
        throw new Error('Ingredients can not be undefined.');
    }

    var pub = this;
	pub.match = function(innerTable)
    {
        innerTable = pub.planify(innerTable);

		var retObject = null;
        var ingList = ingredients.getList(); // gets all known ingredients
		for(objectName in ingList) { // iterates through all known ingredients
			var object = ingredients.getById(objectName); // gets current ingredient object
            var currentRecipe = object.recipe; // gets current ingredient recipe
			var matches = 0;

            // If it is a base object, ignore
            if(currentRecipe == null) {
                continue;
            }
            currentRecipe = pub.convertNumericToObjectRecipe(currentRecipe); // Converts numeric recipe to object recipe
            currentRecipe = pub.planify(currentRecipe); // aligns recipe grid to match player grid

            for(a in currentRecipe) { // iterates through current recipe
                if(currentRecipe[a].id == innerTable[a].id) { // compares recipe item to player item
                    matches++; // increments matches if they are the same
                }
            }
            // if all items match, return the object
			if(matches == currentRecipe.length) { 
				retObject = ingredients.getById(objectName);
			}
		}

		return retObject;
	}
    pub.planify = function(table) {
        var plannified = [];
        var firstObjectFound = false;
        for(var i = 0; i < table.length; i++) {
            if(typeof(table[i]) == 'object' && table[i].name !== 'air') {
                firstObjectFound = true;
            }

            if(firstObjectFound) {
                plannified.push(table[i]);
            }
        }

        // Fill table with air objects
        for(var i = plannified.length; i < 9; i++) {
            plannified.push(ingredients.air);
        }

        return plannified;
    }
    pub.convertNumericToObjectRecipe = function(recipe) {
        var outRecipe = [];
        for(a in recipe) {
            outRecipe.push(ingredients.getById(recipe[a]));
        }

        return outRecipe;
    }
}

