import { inputConf } from "../components/form/input/Input";
// import { selectConf } from "./control/Select";
import { radioConf } from "../components/form/radio/Radio";
import { checkBoxConf } from "../components/form/checkbox/CheckBox";
// import { cascaderConf } from "./control/Cascader";
import { textConf } from "../components/form/text/Text";
// import { titleConf } from "./control/Title";
// import { hrConf } from "./control/Hr";
// import { pConf } from "./control/P";
// import { uploadsConf } from './control/Uploads';
import { datePickerConf } from "../components/form/datepicker/DatePicker";
import { signatureConf } from "../components/form/signature/Signature";
// import { addressConf } from './control/Address';

const formList = {
  // title: titleConf,
  // hr: hrConf,
  // p: pConf,
  // select: selectConf,
  // cascader: cascaderConf,
  // address: addressConf,
  // uploads: uploadsConf,
  radio: radioConf,
  checkbox: checkBoxConf,
  input: inputConf,
  text: textConf,
  datepicker: datePickerConf,
  signature: signatureConf
};
let list_arr = [];
for (let i in formList) {
  list_arr.push({
    ele: i,
    obj: formList[i]
  });
}

export default list_arr;
