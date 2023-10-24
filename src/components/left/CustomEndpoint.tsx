import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import { CodeSnippetContext, CodeContext } from '../../App';
import Code from '@mui/icons-material/Code';
import { modalLayout } from '../../utils/interfaces';

//----------------
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 'fit-content',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
//MUI styling fior modal
//-----------------
const cacheModal: string[] = [];

const CustomEndpoint = ({
  handleCreateCustomEndpoint,
  handleInputBoilerFiles,
  explorer,
}: any) => {
  const [folder, setFolder] = useState('');
  const [file, setFile] = useState('');
  const [open, setOpen] = useState(false);
  const [componentName, setComponentName] = useContext(CodeContext);
  const [codeSnippet, setCodeSnippet] = useContext(CodeSnippetContext);

  const handleClose = () => {
    setOpen(false);
    setFolder('');
    setSelectedItems({});
  };

  const [selectedItems, setSelectedItems] = useState<modalLayout>({
    default: false,
    error: false,
    layout: false,
    loading: false,
    notFound: false,
    route: false,
    template: false,
    page: true,
  });

  function handleChange(e?: any) {
    setFolder(e.target.value);
  }

  useEffect(() => {
    handlePostingFiles(folder, componentName, codeSnippet);
    handleInputBoilerFiles(explorer.id, componentName, folder, codeSnippet);
  }, [codeSnippet]);

  function handleModalChange(e?: any) {
    console.log('customendpoint modal change');
    const name = e.target.name.slice(0, -4);

    setSelectedItems({
      ...selectedItems,
      [name]: true,
    });

    const fileName = e.target.name;
    setFile(fileName);

    setComponentName(fileName);
  }

  const handlePostingFiles = async (
    folderName: string,
    fileName: string,
    code: string
  ) => {
    const body = {
      fileName: fileName,
      folderName: folderName,
      codeSnippet: code,
    };
    await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  const handleCreateCustomFolder = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();

    const body = { name: folder };

    await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (folder) {
      handleCreateCustomEndpoint(explorer.id, folder);
      setOpen(true);
    }
  };
  return (
    <div className='cursor'>
      <form>
        <div className='input-container'>
          <input
            type='text'
            autoFocus
            placeholder='New Endpoint'
            onChange={handleChange}
            value={folder}
            id='searchInput'
          />
          <div className='text-cursor'></div>
        </div>

        <button type='submit' onClick={handleCreateCustomFolder}>
          Submit
        </button>
      </form>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-title'
            variant='h6'
            component='h2'
            style={{ marginBottom: 20, fontSize: 30 }}
          >
            Choose Your Template Files
          </Typography>

          <div>
            <Checkbox name='page.tsx' checked={selectedItems.page} />
            page.tsx
          </div>

          <div>
            <Checkbox
              name='default.tsx'
              checked={selectedItems.default}
              onChange={handleModalChange}
            />
            default.tsx
          </div>

          <div>
            <Checkbox
              name='error.tsx'
              checked={selectedItems.error}
              onChange={handleModalChange}
            />
            error.tsx
          </div>

          <div>
            <Checkbox
              name='layout.tsx'
              checked={selectedItems.layout}
              onChange={handleModalChange}
            />
            layout.tsx
          </div>

          <div>
            <Checkbox
              name='loading.tsx'
              checked={selectedItems.loading}
              onChange={handleModalChange}
            />
            loading.tsx
          </div>

          <div>
            <Checkbox
              name='notFound.tsx'
              checked={selectedItems.notFound}
              onChange={handleModalChange}
            />
            notFound.tsx
          </div>

          <div>
            <Checkbox
              name='route.tsx'
              checked={selectedItems.route}
              onChange={handleModalChange}
            />
            route.tsx
          </div>

          <div>
            <Checkbox
              name='template.tsx'
              checked={selectedItems.template}
              onChange={handleModalChange}
            />
            template.tsx
          </div>

          <Button onClick={handleClose} sx={{ mt: 3 }}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomEndpoint;
