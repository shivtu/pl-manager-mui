import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const UploadIconButton = ({
  label = 'Upload',
  labelVariant = 'subtitle1',
  onChange,
  uploadIcon = <AttachFileIcon />,
}: {
  label?: string;
  labelVariant?:
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline'
    | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  uploadIcon?: JSX.Element;
}) => {
  return (
    <label htmlFor='icon-button-file'>
      <input
        id='icon-button-file'
        type='file'
        style={{ display: 'none' }}
        onChange={onChange}
      />
      <IconButton
        color='primary'
        aria-label='upload picture'
        component='span'
        size='small'
      >
        <Typography variant={labelVariant}>{label}</Typography>
        {uploadIcon}
      </IconButton>
    </label>
  );
};

export default UploadIconButton;
