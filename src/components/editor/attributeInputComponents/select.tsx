import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

type Props = {
  name: string;
  list: string[];
  value: string;
  onDataChanged: (type: string, value: any) => void;
};

export function SelectInput(props: Props) {
  const { value, onDataChanged, name, list } = props;

  const handleChange = (event: any) => {
    onDataChanged(name, event.target.value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel>{name}</InputLabel>
      <Select value={value} onChange={handleChange} label={name}>
        {list.map(val => {
          const value = typeof val === 'string' ? val : val + '';
          return (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
