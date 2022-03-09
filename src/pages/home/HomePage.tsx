import { Autocomplete, Button, Stack, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const HomePage = () => {
  const optionList = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
      label: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
      label: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      label: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
      label: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
    {
      label: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { label: 'City of God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'The Silence of the Lambs', year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: 'Life Is Beautiful', year: 1997 },
    { label: 'The Usual Suspects', year: 1995 },
    { label: 'Léon: The Professional', year: 1994 },
    { label: 'Spirited Away', year: 2001 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'City Lights', year: 1931 },
    { label: 'Psycho', year: 1960 },
    { label: 'The Green Mile', year: 1999 },
    { label: 'The Intouchables', year: 2011 },
    { label: 'Modern Times', year: 1936 },
  ];
  return (
    <>
      <Stack spacing={4} sx={{ width: 300 }}>
        Autocomplete Variants
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          options={optionList}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Options'
              variant='standard'
              size='small'
            />
          )}
        />
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          options={optionList}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Options'
              variant='filled'
              size='small'
            />
          )}
        />
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          options={optionList}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Options'
              variant='outlined'
              size='small'
            />
          )}
        />
        <span style={{ marginBottom: '50px' }} />
        Select variants
        <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='demo-simple-select-standard-label'>Age</InputLabel>
          <Select
            labelId='demo-simple-select-standard-label'
            id='demo-simple-select-standard'
            value={11}
            onChange={() => null}
            label='Age'
            size='small'
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant='filled' sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='demo-simple-select-filled-label'>Age</InputLabel>
          <Select
            labelId='demo-simple-select-filled-label'
            id='demo-simple-select-filled'
            value={15}
            onChange={() => null}
            size='small'
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Button
          size='small'
          style={{ borderRadius: 0, width: 175 }}
          variant='contained'
        >
          Filled condensed
        </Button>
        <Button
          style={{ borderRadius: 0, width: 175 }}
          variant='contained'
          disabled
        >
          Disabled
        </Button>
        <Button style={{ borderRadius: 0, width: 175 }} variant='outlined'>
          Outlined broad
        </Button>
        <Button style={{ borderRadius: 0, width: 175 }} variant='contained'>
          Filled broad
        </Button>
      </Stack>
      <br />
      <br />
      <br />
      <Stack></Stack>
    </>
  );
};

export default HomePage;
