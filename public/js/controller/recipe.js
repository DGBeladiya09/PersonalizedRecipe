angular.module("PRApp").controller("recipeController", function ($scope,$timeout,recipeService) {
    $scope.recipe = {
        name: "", description: "", cost: "", time: "", noOfPerson: "",
        ageCategory: { min: "", max: "" }, category: ""
    }
    $scope.ingredient = { name: "", weight: "", isRequired: false }
    $scope.ingredients = []
    $scope.steps = []
    $scope.image;
    $scope.step = { description: "", isAlarm: false, time: "" }
    $scope.addIngredient = () => {

        $scope.ingredients.push({ name: $scope.ingredient.name, weight: $scope.ingredient.weight, isRequired: $scope.ingredient.isRequired });
        //console.log({name:$scope.ingredient.name,weight:$scope.ingredient.weight,isRequired:$scope.ingredient.isRequired})
        $scope.ingredient = { name: "", weight: "", isRequired: false }
    }
    $scope.removeIngredient = (index) => { $scope.ingredients.splice(index, 1) }
    $scope.addStep = () => {
        $scope.steps.push({ description: $scope.step.description, isAlarm: $scope.step.isAlarm, time: $scope.step.time })
        $scope.step = { description: "", isAlarm: false, time: "" }
    }
    $scope.removeStep = (index) => {
        $scope.steps.splice(index, 1)
    }
    $scope.getData=()=>{
        recipeService.getData()
    }
    $scope.createRecipe = () => {
        var formData = new FormData();
        console.log($scope.steps)
        formData.append("image", $scope.image)
        formData.append("name", $scope.recipe.name)
        formData.append("description", $scope.recipe.description)
        formData.append("cost", $scope.recipe.cost)
        formData.append("category", $scope.recipe.category)
        formData.append("ageCategory", $scope.recipe.ageCategory)
        formData.append("time", $scope.recipe.time)
        formData.append("noOfPerson", $scope.recipe.noOfPerson)
        formData.append("ingredient", JSON.stringify($scope.ingredients))
        formData.append("step", JSON.stringify($scope.steps))
        recipeService.createRecipe(formData).then(
            (result) => {
                $scope.errorMsg = false;
                $scope.successMsg = true;
                $scope.recipe = {
                    name: "", description: "", cost: "", time: "", noOfPerson: "",
                    ageCategory: { min: "", max: "" }, category: ""
                }
                $scope.errors = {};
                $scope.ingredients = [];
                $scope.steps = [];
                $timeout(() => { $scope.getData() }, 1000);
            },
            (error) => {
                $scope.errorMsg = true;
                $scope.successMsg = false;
                $scope.errors = error.errors
            })


    }
});