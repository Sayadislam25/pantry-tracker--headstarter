// 'use client'

// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import { Box, Stack, Typography, Button, Modal, TextField, AppBar, Toolbar, IconButton, InputBase } from '@mui/material';
// import { styled, alpha } from '@mui/material/styles';
// import { firestore } from '@/firebase';

// import {
//   collection,
//   doc,
//   getDocs,
//   query,
//   setDoc,
//   deleteDoc,
//   getDoc,
// } from 'firebase/firestore';

// // Search Bar Component
// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   width: '100%',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));

// function SearchAppBar({ onSearch }) {
//   const handleSearch = (event) => {
//     onSearch(event.target.value);
//   };

//   return (
//     <AppBar position="static" sx={{ zIndex: 1300 }}> {/* Ensures AppBar is on top */}
//       <Toolbar>
//         <IconButton
//           size="large"
//           edge="start"
//           color="inherit"
//           aria-label="open drawer"
//           sx={{ mr: 2 }}
//         >
          
//         </IconButton>
//         <Typography
//           variant="h6"
//           noWrap
//           component="div"
//           sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
//         >
//           Inventory Search
//         </Typography>
//         <Search>
//           <SearchIconWrapper>
           
//           </SearchIconWrapper>
//           <StyledInputBase
//             placeholder="Search…"
//             inputProps={{ 'aria-label': 'search' }}
//             onChange={handleSearch}
//           />
//         </Search>
//       </Toolbar>
//     </AppBar>
//   );
// }

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'white',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
//   display: 'flex',
//   flexDirection: 'column',
//   gap: 3,
// };

// export default function Home() {
//   const [inventory, setInventory] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [itemName, setItemName] = useState('');
//   const [searchTerm, setSearchTerm] = useState(''); // Add state for search term

//   const updateInventory = async () => {
//     const snapshot = query(collection(firestore, 'inventory'));
//     const docs = await getDocs(snapshot);
//     const inventoryList = [];
//     docs.forEach((doc) => {
//       inventoryList.push({
//         name: doc.id,
//         ...doc.data(),
//       });
//     });
//     setInventory(inventoryList);
//   };

//   useEffect(() => {
//     updateInventory();
//   }, []);

//   const addItem = async (item) => {
//     const docRef = doc(collection(firestore, 'inventory'), item);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const { quantity } = docSnap.data();
//       await setDoc(docRef, { quantity: quantity + 1 });
//     } else {
//       await setDoc(docRef, { quantity: 1 });
//     }
//     await updateInventory();
//   };

//   const removeItem = async (item) => {
//     const docRef = doc(collection(firestore, 'inventory'), item);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const { quantity } = docSnap.data();
//       if (quantity === 1) {
//         await deleteDoc(docRef);
//       } else {
//         await setDoc(docRef, { quantity: quantity - 1 });
//       }
//     }
//     await updateInventory();
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const filteredInventory = inventory.filter(({ name }) =>
//     name.toLowerCase().includes(searchTerm.toLowerCase())
//   ); // Filter inventory based on search term

//   return (
//     <Box
//       width="100vw"
//       height="100vh"
//       display="flex"
//       flexDirection="column"
//       justifyContent="center"
//       alignItems="center"
//       gap={2}
//     >
//       <SearchAppBar onSearch={setSearchTerm} /> {/* Add the SearchAppBar component */}
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Add Item
//           </Typography>
//           <Stack width="100%" direction={'row'} spacing={2}>
//             <TextField
//               id="outlined-basic"
//               label="Item"
//               variant="outlined"
//               fullWidth
//               value={itemName}
//               onChange={(e) => setItemName(e.target.value)}
//             />
//             <Button
//               variant="outlined"
//               onClick={() => {
//                 addItem(itemName);
//                 setItemName('');
//                 handleClose();
//               }}
//             >
//               Add
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>
//       <Button variant="contained" onClick={handleOpen}>
//         Add New Item
//       </Button>
//       <Box border={'1px solid #333'} width="800px">
//         <Box
//           height="100px"
//           bgcolor={'#ADD8E6'}
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//         >
//           <Typography variant={'h2'} color={'#333'} textAlign="center">
//             Inventory Items
//           </Typography>
//         </Box>
//         <Stack width="100%" spacing={2} overflow="auto">
//           {filteredInventory.map(({ name, quantity }) => (
//             <Box
//               key={name}
//               minHeight="150px"
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//               bgcolor={'#f0f0f0'}
//               paddingX={5}
//             >
//               <Typography variant={'h3'} color={'#333'}>
//                 {name.charAt(0).toUpperCase() + name.slice(1)}
//               </Typography>
//               <Typography variant={'h3'} color={'#333'}>
//                 Quantity: {quantity}
//               </Typography>
//               <Button variant="contained" onClick={() => removeItem(name)}>
//                 Remove
//               </Button>
//             </Box>
//           ))}
//         </Stack>
//       </Box>
//     </Box>
//   );
// }




//  'use client'

// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material';
// import { firestore } from '@/firebase';
// import {
//   collection,
//   doc,
//   getDocs,
//   query,
//   setDoc,
//   deleteDoc,
//   getDoc,
// } from 'firebase/firestore';
// import SearchAppBar from './searchbar'; // Import the SearchAppBar

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'white',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
//   display: 'flex',
//   flexDirection: 'column',
//   gap: 3,
// };

// export default function Home() {
//   const [inventory, setInventory] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [itemName, setItemName] = useState('');
//   const [searchTerm, setSearchTerm] = useState(''); // Add state for search term

//   const updateInventory = async () => {
//     const snapshot = query(collection(firestore, 'inventory'));
//     const docs = await getDocs(snapshot);
//     const inventoryList = [];
//     docs.forEach((doc) => {
//       inventoryList.push({
//         name: doc.id,
//         ...doc.data(),
//       });
//     });
//     setInventory(inventoryList);
//   };

//   useEffect(() => {
//     updateInventory();
//   }, []);

//   const addItem = async (item) => {
//     const docRef = doc(collection(firestore, 'inventory'), item);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const { quantity } = docSnap.data();
//       await setDoc(docRef, { quantity: quantity + 1 });
//     } else {
//       await setDoc(docRef, { quantity: 1 });
//     }
//     await updateInventory();
//   };

//   const removeItem = async (item) => {
//     const docRef = doc(collection(firestore, 'inventory'), item);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const { quantity } = docSnap.data();
//       if (quantity === 1) {
//         await deleteDoc(docRef);
//       } else {
//         await setDoc(docRef, { quantity: quantity - 1 });
//       }
//     }
//     await updateInventory();
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const filteredInventory = inventory.filter(({ name }) =>
//     name.toLowerCase().includes(searchTerm.toLowerCase())
//   ); // Filter inventory based on search term

//   return (
//     <Box
//       width="100vw"
//       height="100vh"
//       display="flex"
//       flexDirection="column"
//       justifyContent="center"
//       alignItems="center"
//       gap={2}
//       textAlign="center" // Centering text within the components
//     >
//       <SearchAppBar onSearch={setSearchTerm} /> {/* Add the SearchAppBar component */}
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Add Item
//           </Typography>
//           <Stack width="100%" direction={'row'} spacing={2}>
//             <TextField
//               id="outlined-basic"
//               label="Item"
//               variant="outlined"
//               fullWidth
//               value={itemName}
//               onChange={(e) => setItemName(e.target.value)}
//             />
//             <Button
//               variant="outlined"
//               onClick={() => {
//                 addItem(itemName);
//                 setItemName('');
//                 handleClose();
//               }}
//             >
//               Add
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>
//       <Button variant="contained" onClick={handleOpen}>
//         Add New Item
//       </Button>
//       <Box border={'1px solid #333'} width="800px" textAlign="center">
//         <Box
//           height="100px"
//           bgcolor={'#ADD8E6'}
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//         >
//           <Typography variant={'h2'} color={'#333'} textAlign="center">
//             Inventory Items
//           </Typography>
//         </Box>
//         <Stack width="100%" spacing={2} overflow="auto">
//           {filteredInventory.map(({ name, quantity }) => (
//             <Box
//               key={name}
//               minHeight="150px"
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//               bgcolor={'#f0f0f0'}
//               paddingX={5}
//             >
//               <Typography variant={'h3'} color={'#333'}>
//                 {name.charAt(0).toUpperCase() + name.slice(1)}
//               </Typography>
//               <Typography variant={'h3'} color={'#333'}>
//                 Quantity: {quantity}
//               </Typography>
//               <Button variant="contained" onClick={() => removeItem(name)}>
//                 Remove
//               </Button>
//             </Box>
//           ))}
//         </Stack>
//       </Box>
//     </Box>
//   );
// }





'use client'

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material';
import { firestore } from '@/firebase';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import SearchAppBar from './searchbar'; // Import the SearchAppBar

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Add state for search term

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredInventory = inventory.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filter inventory based on search term

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      //justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >
      <SearchAppBar onSearch={setSearchTerm} /> {/* Add the SearchAppBar component */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <Box border={'1px solid #333'}>
        <Box
          width="800px"
          height="100px"
          bgcolor={'#ADD8E6'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
            Inventory Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
          {filteredInventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={'#f0f0f0'}
              padding={10}
            >
              <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                Quantity: {quantity}
              </Typography>
              <Button variant="contained" onClick={() => removeItem(name)}>
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}





