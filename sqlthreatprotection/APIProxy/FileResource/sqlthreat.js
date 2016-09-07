//Regex based check to see if the input query contains text like
//delete, select, update etc.. this regex can be modified as per your organization's need
function isThreat(value){
    var regex = new RegExp("[\s]*((delete)|(exec)|(drop\s*table)|(insert)|(shutdown)|(update)|(\bor\b))");
    return regex.test(value);
}

//Helper function to read all the query parameter passed by the client
function readAllQueryValues(){
    var queryValues = [];
    var queryParamString =  context.getVariable('message.querystring');
    if(queryParamString && queryParamString !== ""){
        var queryParams = queryParamString.split('&');
        for(var i=0,length=queryParams.length;i<length;i++){
            queryValues.push(queryParams[i].split('=')[1]);
        }
    }
    return queryValues;
}

//check for the sql threat based on the regex pattern. if the pattern matches then set the
//context variable so that it custom error can be raised
function checkForSQLThreat(){
    var queryValues = readAllQueryValues();
    if(queryValues != null && queryValues.length > 0){
        for(var i=0,length=queryValues.length;i<length;i++){
            if(isThreat(queryValues[i])) {
                context.setVariable("sapapim.issqlthreat",true);
                return;
            }
        }
    
    }
}

checkForSQLThreat();