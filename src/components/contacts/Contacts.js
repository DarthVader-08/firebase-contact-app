import React from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper
} from "@mui/material";

import {useFetch,DeleteUser} from "../../utils/functions"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const Contacts = ({editUser}) => {
 const {isLoading,contactList}=useFetch();
 const capitalizeFirstLowercaseRest = str => {
  return str.toLowerCase()
  .split(' ')
  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  .join(' ');
};

  return (
    <div className="contact-table">
      <h2 className="contact-header">Contacts</h2>
      <TableContainer component={Paper}>
        <Table className="table" >
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="left">Phone Number</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Delete</TableCell>
              <TableCell align="left">Edit</TableCell>
            </TableRow>
          </TableHead>        
         
          <TableBody>  
          

            {
              // /* Bilgiler gelmediği durumda Loading yazısı görünsün */
              isLoading ? (
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>            
                <TableCell colSpan={5} align="center">Loading</TableCell>             
              </TableRow>
              ) :
              // Bilgiler olmadığı,boş olduğu  durumda veri bulunamadı mesajı
                contactList?.length===0 ?(
                  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>            
                  <TableCell colSpan={5} align="center">NO RESULT FOUND</TableCell>             
                </TableRow>
                  ) :
                  // Bilgiler geldiği zaman aşağıya yazılacak kodlar çalışsın
                  (
                    contactList?.map((item,index)=>(

                      <TableRow key={index}>
                      <TableCell align="left">{capitalizeFirstLowercaseRest(item.username)}</TableCell>
                      <TableCell align="left">{item.phoneNumber}</TableCell>
                      <TableCell align="left">{item.gender}</TableCell> 
                      <TableCell align="center" onClick={()=>DeleteUser(item.id)}>
                        <DeleteIcon/>
                      </TableCell> 
                      <TableCell align="center"
                     onClick={()=>editUser(
                      item.id, item.username,item.phoneNumber,item.gender
                    )}>
                        <EditIcon/>
                      </TableCell> 
                     </TableRow>      

                    ))
                  )  

            }
           
              

             

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Contacts;

