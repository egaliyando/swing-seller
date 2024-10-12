import { RHFEditor } from './rhf-editor';
import { RHFSwitch } from './rhf-switch';
import { RHFTextField } from './rhf-text-field';
import { RHFRadioGroup } from './rhf-radio-group';
import { RHFAutocomplete } from './rhf-autocomplete';
import { RHFSelect, RHFMultiSelect } from './rhf-select';
import { RHFCheckbox, RHFMultiCheckbox } from './rhf-checkbox';
import { RHFUpload, RHFUploadBox, RHFUploadAvatar } from './rhf-upload';
// import { RHFDatePicker, RHFMobileDateTimePicker } from './rhf-date-picker';

// ----------------------------------------------------------------------

export const Field = {
  Text: RHFTextField,
  Editor: RHFEditor,
  Upload: RHFUpload,
  Select: RHFSelect,
  MultiSelect: RHFMultiSelect,
  Checkbox: RHFCheckbox,
  UploadBox: RHFUploadBox,
  RadioGroup: RHFRadioGroup,
  Autocomplete: RHFAutocomplete,
  MultiCheckbox: RHFMultiCheckbox,
  UploadAvatar: RHFUploadAvatar,
  Switch: RHFSwitch,
  // DatePicker: RHFDatePicker,
  // MobileDateTimePicker: RHFMobileDateTimePicker,
};
