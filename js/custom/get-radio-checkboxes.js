/* this is a generic code to get the values from either a radio button or checkboxes groups.
Pass the parameter (inputNameAttribute) from the input attribute name e.g <input type="checkbox" name="something">
and also the parameter (selectorVariableName) from a selector selector name
e.g const pr = document.querySelect('input[name="checkboxname"]')
*/
export const getRadioAndCheckBoxesValues = 
function (inputNameAttribute, selectorVariableName) {
    if (inputNameAttribute && selectorVariableName) {
        document.querySelectorAll(`input[name="${inputNameAttribute}"]`).forEach((check) => {
            check.addEventListener("change", function () {
                selectorVariableName.value = this.value;
            });
        });
    } else {
        return
    }
}