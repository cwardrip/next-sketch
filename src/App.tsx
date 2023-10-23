import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import StaticTagsContainer from './components/middle/StaticTagsContainer';
import './App.css';
import CreateComponentBtn from './components/middle/CreateComponentBtn';
import explorer from './components/left/data/folderData';
import Folder from './components/left/folder';
import useTraverseTree from './components/left/hooks/use-traverse-tree';
import CustomEndpoint from './components/left/CustomEndpoint';
import TabsComponent from './components/right/TabsComponent';
import DisplayContainer from './components/right/DisplayContainer';
import { Tag, Elements } from './utils/interfaces';
import { generateId } from './utils/generateId';
import WebFont from 'webfontloader';

interface ComponentNameType {
  componentName: string;
  setComponentName: Dispatch<SetStateAction<string>>;
}

interface CodeSnippetType {
  codeSnippet: string;
  setCodeSnippet: Dispatch<SetStateAction<string>>;
}

export const CodeContext = React.createContext<ComponentNameType | undefined>(
  undefined
);

export const CodeSnippetContext = React.createContext<
  CodeSnippetType | undefined
>(undefined);

const App = () => {

  const [folderExpanded,setFolderExpanded] = useState(false);
  const [open,setOpen] = useState(false);

  const [elements, setElements] = useState<Tag[]>([
    { id: generateId(), name: 'div' },
    {
      id: generateId(),
      name: 'img',
    },
    {
      id: generateId(),
      name: 'p',
    },
    {
      id: generateId(),
      name: 'form',
    },
    {
      id: generateId(),
      name: 'button',
    },
    {
      id: generateId(),
      name: 'link',
    },
  ]);

  const [explorerData, setExplorerData] = useState(explorer);
  const [componentName, setComponentName] = useState<string>('App');
  //Check what this setCode is doing??
  const [code, setCode] = useState<string>('Hello'); // Use state to store the code
  const [codeSnippet, setCodeSnippet] = useState<CodeSnippetType | undefined>(
    undefined
  );

  const { insertNode, deleteNode, createCustomEndpoint, insertBoilerFiles } =
    useTraverseTree();

  const handleInsertNode = (
    folderId: number,
    item: string,
    isFolder: boolean,
    preview: string
  ) => {
    const finalTree: any = insertNode(
      explorerData,
      folderId,
      item,
      isFolder,
      preview
    );

    setExplorerData(finalTree);
  };

  const handleDeleteNode = (folderId: number) => {
    const finalTree: any = deleteNode(explorerData, folderId);
    setExplorerData(finalTree);
  };

  const handleCreateCustomEndpoint = (folderId: number, item: string) => {
    const finalTree: any = createCustomEndpoint(explorerData, folderId, item);
    setExplorerData(finalTree);
  };

  const handleInputBoilerFiles = (
    folderId: number,
    item: string,
    folderName: string,
    preview: string
  ) => {
    const finalTree: any = insertBoilerFiles(
      explorerData,
      folderId,
      item,
      folderName,
      preview
    );


    setExplorerData(finalTree);
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Titillium Web'],
      },
    });
  }, []);

  return (
    <Box>
      <Typography
        variant='h1'
        fontSize={'3em'}
        fontFamily={'Titillium Web'}
        textAlign={'center'}
        marginBottom={'0.5em'}
        color={'#061E47'}
        sx={{
          textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)', // Adjust shadow values as needed
        }}
      >
        NextSketch
      </Typography>
      <Box
        sx={{
          margin: 2,
          padding: 2,
          borderRadius: 3,
          bgcolor: 'rgba(255, 255, 255, 0.7)',
          boxShadow: '7px 12px 49px -14px rgba(255,255,255,1)',
        }}
      >
        <CodeContext.Provider value={[componentName, setComponentName]}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              justifyContent={'space-between'}
              sx={{ height: '85vh' }}
            >
              <Grid item xs={3.5}>
                <CustomEndpoint
                  handleCreateCustomEndpoint={handleCreateCustomEndpoint}
                  handleInputBoilerFiles={handleInputBoilerFiles}
                  explorer={explorerData}
                />
                <Folder
                  handleInsertNode={handleInsertNode}
                  handleDeleteNode={handleDeleteNode}
                  explorer={explorerData}
                />
              </Grid>

              <Grid item xs={4} sx={{ display: 'flex' }}>
                <Grid alignSelf={'flex-start'}>
                  <CreateComponentBtn />
                </Grid> */}
                <StaticTagsContainer />
              </Grid>

                <Grid item xs={4} sx={{ height: '500px' }}>
                  <TabsComponent
                    code={code}
                    setCode={setCode}
                    treeData={explorerData}
                  />
                  {/* <DisplayContainer /> */}
                </Grid>
              </Grid>
            </Box>
          </CodeSnippetContext.Provider>
        </CodeContext.Provider>
      </Box>
    </Box>
  );
};

export default App;
