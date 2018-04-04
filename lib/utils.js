
/**
 * 
 * @param chalk 
 */
exports.buildChalk = function(chalk){
    return function(content){
        return console.log(chalk(content));
    }
};