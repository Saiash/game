import { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

type props = {
  writeToLog: (result: string) => void;
  generator: (fields: any) => string;
  GenName: string;
  table: {
    [index: string]: { type: string; options?: string[]; default?: string };
  };
};

export function DefaultCombinedGenerator(props: props) {
  const { writeToLog, generator, GenName, table } = props;
  const fields = Object.keys(table)
    .map(key => {
      const defaultValue: string =
        typeof table[key].default === 'string'
          ? (table[key].default as string)
          : '';
      if (table[key].type === 'number') {
        return useState<number>(0);
      }
      return useState<string>(
        defaultValue || (table[key].options || [''])[0] || ''
      );
    })
    .map(field => {
      return [
        ...field,
        (event: any) => {
          field[1](event.target.value);
        },
      ];
    });

  const Generate = () => generator(fields);
  return (
    <>
      <FormControl sx={{ m: 1 }} size="small">
        {fields.map((field: any, key: number) => {
          const keys = Object.keys(table);
          return (
            <FormControl sx={{ m: 1 }} size="small">
              {table[keys[key]].type === 'number' && (
                <TextField
                  value={field[0]}
                  type="number"
                  onChange={field[2]}
                  label={keys[key]}
                  size={'small'}
                ></TextField>
              )}
              {table[keys[key]].type === 'select' && (
                <>
                  <InputLabel>{keys[key]}</InputLabel>
                  <Select
                    value={field[0]}
                    label={keys[key]}
                    onChange={field[2]}
                  >
                    {table[keys[key]].options?.map(option => {
                      return <MenuItem value={option}>{option}</MenuItem>;
                    })}
                  </Select>
                </>
              )}
            </FormControl>
          );
        })}
        <FormControl sx={{ m: 1 }} size="small">
          <Button
            style={{ margin: 3 }}
            key={GenName}
            variant="contained"
            onClick={() => {
              writeToLog(Generate());
            }}
          >
            {GenName}
          </Button>
        </FormControl>
      </FormControl>
    </>
  );
}
