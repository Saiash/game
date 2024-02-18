import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  name: string;
  list: string[] | boolean[] | { key: string; value: string }[];
  value: string[];
  onDataChanged: (type: string, value: any) => void;
};

export function MultiSelectInput(props: Props) {
  const { value, onDataChanged, name, list } = props;

  const handleChange = (event: any, newValue: any) => {
    onDataChanged(name, newValue);
  };

  const _list = list.map(val => val.toString());
  const _value = value || [];
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Autocomplete
        multiple={true}
        onChange={handleChange}
        options={_list}
        getOptionLabel={(option: any) => option}
        size={'small'}
        defaultValue={[..._value]}
        renderInput={params => <TextField {...params} label={name} />}
        sx={{ minWidth: '250px', maxWidth: '500px' }}
      />
    </FormControl>
  );
}
