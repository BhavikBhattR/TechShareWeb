import { Box, FormControl, TextField, TextareaAutosize, CircularProgress } from "@mui/material";
import { categories } from "../constants/data";
import styled from "@emotion/styled";
import { useEffect, useState, useContext } from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { API } from "../services/api";
import { Buffer } from "buffer";
import {DataContext} from '../context/DataProvider.js'
import {useNavigate} from 'react-router-dom'


const ProgressBarContainer = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    background: rgb(14,14,14, 0.2);
    z-index: 1;
    display: flex;
    justify-content: center;
`

const StyledBox = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    align-items: center;
`

const StyledElement = styled('div')({
    background: 'red',
    margin: 10,
    width: "content-fit",
    padding: 14,
    borderRadius: 10,
    boxSizing: 'border-box'
})

const StyledSelectionTitle = styled('div')`
    font-size: 24px;
    background: black;
    color: white;
    padding: 10px;
    border-radius: 10px;
    padding: 10px 10px;
`



const InputBox = styled(Box)`
    marginTop: 40px;
`

const StyledTextField = styled(TextField)`
    width: 100%;
    border-radius: 20px;
    margin-top: 15px;
    box-sizing: border-box;

`
const Container = styled('Box')`
    margin-right: 40px;
    margin-left: 40px;
`
const StyledLabel = styled('label')({
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 1,
    margin: 20,
    border: 1,
    borderColor: "black"
})

const StyledUploadLabel = styled('label')({
    position: "fixed",
    bottom: 0,
    right: 0,
    zIndex: 1,
    margin: 20,
    border: 1,
    borderColor: "black"
})

const StyledTextArea = styled(TextareaAutosize)`
    width: 100%;
    border-radius: 5px;
    padding: 6px 6px;
    box-sizing: border-box;
    font-size: 18px;
`

const MediaFilesContainer = styled(Box)`
    height: 50vh;
    display: flex;
    flex-wrap: wrap;
    margin: 40px;
    & >div{
        position: relative;
        margin: 20px auto;
        border-radius: 10px;
    };
    & >div >img{
        height: 300px;
        // margin: 20px auto;
        border-radius: 10px;
    }
`

const StyledCloseButton = styled('button')({
        position: "absolute",
        top: 0,
        right: 0,
        width: 30,
        height: 30,
        marginRight: 6,
        color: "white",
        marginTop: 6,
        backgroundColor: "rgba(0, 0, 0, 0.2)" /* semi-transparent black */
})

let intialPost = {
    title: '',
    description: '',
    images: [],
    userName: '',
    attachedFields: [],
    createdDate:  new Date() 
}

function CreatePost(){

    const [selectedFields, selectField] = useState([]);
    const [images, setImages] = useState([])
    const [post, setPost] = useState(intialPost)

    const {account, setAccount} = useContext(DataContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        intialPost = {
            ...intialPost,
            ['userName']: account.userName,
            ['createdDate']: new Date()
        }
    }, [])
    

    function select(type){
        if(selectedFields.includes(type)){
            let selected = selectedFields.filter((field)=> field !== type)
             selectField(selected)
        }else{
             const newArray = [...selectedFields, type];
             selectField(newArray)
        }
    }

    const handleDataInputChnages = (e) => {
        intialPost = {
            ...intialPost, [e.target.name]: e.target.value
        }
    }

    useEffect( () =>{
        setPost(intialPost)
    },
        [intialPost]
    )

    useEffect(()=>{
        intialPost = {
            ...intialPost, ['attachedFields'] : selectedFields
        }
    }, [selectedFields])

    useEffect(() => {
        console.log(images)
    }, [images])

    const handleImageChange = event => {
        const newImages = Array.from(event.target.files);
    
        Promise.all(newImages.map(file => {
          return (new Promise((resolve, reject) => {
            const reader = new FileReader();
    
            reader.addEventListener('load', () => {
              resolve(reader.result);
            });
    
            reader.addEventListener('error', () => {
              reject(reader.error);
            });
    
            reader.readAsDataURL(file);
          }));
        }))
        .then(dataUrls => {
          setImages([...images, ...dataUrls]);
          console.log(images)
        });
      };

      function removeImage(index){
        console.log('image removal for ', index)
        console.log(images[index])
        const newFiles = [...images];
        newFiles.splice(index, 1)
        setImages(newFiles)
      } 

      const handleFileUploading = async() =>{
        console.log('username', account.userName)
        const formData = new FormData();
        
        for (let i = 0; i < images.length; i++) {
            // Parse the data URL to extract the data and metadata
            const matches = images[i].match(/^data:(.+);base64,(.+)$/);
            const contentType = matches[1];
            const base64Data = matches[2];
          
            // Decode the base64 data to binary data
            const binaryData = Buffer.from(base64Data, "base64");
          
            // Convert the binary data to a Blob object
            const blob = new Blob([binaryData], { type: contentType });
          
            // Append the file to the FormData object
            formData.append('files', blob, `file${i}.${contentType.split("/")[1]}`);
          }
           const responses = await API.userFileUpload(formData)

           console.log(responses)

           return responses;

      }

      const finishUploadPost = async() =>{

        const formData = new FormData();
        formData.append("title", post.title);
        formData.append("description", post.description);
        formData.append("images", post.images);
        formData.append("userName", post.userName);
        formData.append("attachedFields", post.attachedFields);
        formData.append("createdDate", post.createdDate);

           const response = await API.createPost(formData);

           if(response.isSuccess){
            setLoading(false)
            intialPost = {
                ...intialPost,
                ['title']: '',
                ['description']: '',
                ['images']: [],
                ['attachedFields']: [],
                ['createdDate']: null
           }
           setPost(intialPost);
           console.log(intialPost)
                navigate('/');
           }else{
            setLoading(false)
           }
           console.log(post)
      }


      const handleUploadPost = async() =>{
        setLoading(true)
        console.log('username', account.userName)
        console.log('length of images', images.length)
        if(images.length > 0){
           const responses = await handleFileUploading();
           intialPost = {
            ...intialPost, 
            ['images']: responses.data.imageUrls,
            ['userName']: account.userName
           }
           console.log('before my condn..', intialPost)
           if(intialPost.createdDate === null || intialPost.userName === ''){
            console.log('its being run broski, it must not be null')
                intialPost = {
                    ...intialPost,
                    ['createdDate'] : new Date(),
                    ['userName']: account.userName
                }
           }
           console.log('after my condn...', post)
           setPost({
            ...intialPost
           })

           finishUploadPost();

        }else{
            intialPost = {
                ...intialPost, 
                ['images']: [],
                ['userName']: account.userName
               }
               if(intialPost.createdDate == null || intialPost.userName === ''){
                intialPost = {
                    ...intialPost,
                    ['createdDate'] : new Date(),
                    ['userName']: account.userName
                }
           }
               console.log(intialPost)
               setPost(intialPost)

        const formData = new FormData();
        formData.append("title", post.title);
        formData.append("description", post.description);
        formData.append("images", post.images);
        formData.append("userName", post.userName);
        formData.append("attachedFields", post.attachedFields);
        formData.append("createdDate", post.createdDate);

           const response = await API.createPost(formData);

           if(response.isSuccess){
            intialPost = {
                ...intialPost,
                ['title']: '',
                ['description']: '',
                ['images']: [],
                ['attachedFields']: [],
                ['createdDate']: null
           }
           setPost(intialPost);
           console.log('after success', intialPost)
                navigate('/');
           }else{
            setLoading(false)
           }
           console.log(post)
        }

        // title: '',
        // description: '',
        // images: [],
        // userName: '',
        // attachedFields: [],
        // createdDate:  new Date() 

      }

    return(
        <Container>
                 {
                loading && 
                <ProgressBarContainer>
                        <CircularProgress style={{margin: "auto"}}/>
                </ProgressBarContainer>
            }
        <InputBox>

        <StyledSelectionTitle>Select the fields your blog is related to:</StyledSelectionTitle>
        <StyledBox>
                {
                    categories.map(category=>{
                        return (
                            <div key={category.id}>
                                <StyledElement style={{background: selectedFields.includes(category.type) ? 'green' : 'red'}} onClick={() => {select(category.type)}}>
                                {category.type}
                                </StyledElement>
                            </div>
                        )
                    })
                }
        </StyledBox>
        </InputBox>

        <InputBox>
        <StyledTextField placeholder="Enter Title of the post" InputProps={{style: {height: '40px'}}} onChange={(e) => handleDataInputChnages(e)} name="title"/>
        </InputBox>
        <FormControl>
            <StyledLabel htmlFor="mediaInput">
                <AddAPhotoIcon fontSize="large" color="action"/>
            </StyledLabel>

            <StyledUploadLabel onClick={handleUploadPost}>Upload</StyledUploadLabel>
            <input 
            type="file" id="mediaInput" multiple style={{display: "none"}} onChange={handleImageChange}
            />
        </FormControl>
        <InputBox>
        <StyledTextArea
            minRows={5}
            placeholder="Share your thoughts here....."
            onChange={(e)=> handleDataInputChnages(e)}
            name="description"
        />
        </InputBox>
        <MediaFilesContainer>
        {images.map((imageUrl, index) => (
            <div>
                <StyledCloseButton onClick={(index) => {removeImage(index)}}>X</StyledCloseButton>
                <img key={index} src={imageUrl} alt={`Image ${index}`} />
            </div>
        ))}
      </MediaFilesContainer>
        </Container>
    )

}

export default CreatePost;