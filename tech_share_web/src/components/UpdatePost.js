import { Box, FormControl, TextField, TextareaAutosize, styled } from "@mui/material";
import { categories } from "../constants/data";
// import styled from "@emotion/styled";
import { useEffect, useState, useContext, useRef } from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { API } from "../services/api";
import { Buffer } from "buffer";
import {DataContext} from '../context/DataProvider.js'
import {useNavigate, useParams} from 'react-router-dom'
import zIndex from "@mui/material/styles/zIndex";


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
`

const ImageBox = styled(Box)`
display: flex;
flex-wrap: wrap;
justfy-content: space-between;
flex-grow: 1;
flex-shrink: 1;
& >div{
    position: relative;
    margin: 20px auto;
    border-radius: 10px;
    padding: 0px;
};
& >div >img{
    height: 300px;
    // margin: 0px auto;
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
        backgroundColor: "rgba(0, 0, 0, 0.2)" ,/* semi-transparent black */
        zIndex: 1
})

const postDefault = {
    title: '',
    description: '',
    images: [],
    userName: '',
    attachedFields: [],
    createdDate:  new Date() 
}

function UpdatePost(){

    const [selectedFields, selectField] = useState([]);
    const [images, setImages] = useState([])
    const [intialPost, setIntialPost] = useState(postDefault) 
    const [post, setPost] = useState(intialPost)
    const initialRender = useRef(true);
    const [newlyAddedImages, setNewAddedImages] = useState([])


    const {account, setAccount} = useContext(DataContext);
    const navigate = useNavigate();
    const id = useParams();


    useEffect(()=>{
        setIntialPost({
            ...intialPost,
            ['images']: [...intialPost.images, ...newlyAddedImages]
        })
        console.log('successfull', intialPost)
    }, [newlyAddedImages])

    
    useEffect(()=>{
        const fetchData = async () => {
            console.log(id)
            let response =  await API.getPostById(id.id);
            console.log(response.data.post.images)
            if(response.isSuccess){
                console.log(response.data.post)
                selectField([...response.data.post.attachedFields[0].split(",")])
                let postToWorkWith  = {
                    ...response.data.post,
                    ['images']: response.data.post.images[0].split(','),
                    ['attachedFields']: response.data.post.attachedFields[0].split(",")
                }
                postToWorkWith = {
                    ...postToWorkWith,
                    ['images']: postToWorkWith.images[0] === '' ? [] : [...postToWorkWith.images]
                }
                console.log('response in updatePost.js', postToWorkWith)
                setIntialPost({
                    ...postToWorkWith
                })
               // intialPost = postToWorkWith
            }
        }
        fetchData();
    }, []
    )

    // useEffect(()=>{
    //     const updatedIntialPost = {
    //         ...intialPost,
    //         ['userName']: account.userName
    //     }
    //     setIntialPost({
    //         ...updatedIntialPost
    //     })
    // }, [])

    useEffect(()=>{
        const update = async() =>{
            finishUpdatePost()
         }
        if (initialRender.current) {
            initialRender.current = false;
          } else {
            update();
          }
    }, [post])
    
    useEffect(()=>{
        setIntialPost({
            ...intialPost,
            ['attachedFields']: [...selectedFields]
        })
    }, [selectedFields])

    function select(type){
        console.log(intialPost)
        console.log(selectedFields)
        console.log('select function is running')
        console.log('type is ', type)
        if(selectedFields.includes(type)){
            let selected = selectedFields.filter((field)=> field !== type)
             selectField([...selected])
        }else{
            console.log(selectedFields)
             const newArray = [...selectedFields, type];
             console.log(newArray)
             selectField([...newArray])
        }
    }

    const handleDataInputChnages = (e) => {
        const updatedIntialPost = {
            ...intialPost, [e.target.name]: e.target.value
        }
        setIntialPost({
            ...updatedIntialPost
        })
    }



    useEffect(()=>{
        const updatedIntialPost = {
            ...intialPost, ['attachedFields'] : selectedFields
        }
        setIntialPost({
            ...updatedIntialPost
        })
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

      function removeImage(imageUrl){

        console.log('images', images)
        console.log('post images', post.images)

        const checkString = imageUrl.split(':');

        console.log(checkString)

        if(checkString[0] === 'http'){
            let imagesUploaded = [...post.images];
            imagesUploaded = imagesUploaded.filter(url => url != imageUrl);
            const updatedPost = {
                ...intialPost,
                ['images']: imagesUploaded
            }
            setIntialPost({
                ...updatedPost
            })
            return;
        }else{
            let imagesSelected = [...images];
            imagesSelected = imagesSelected.filter(url => url != imageUrl);
            setImages(imagesSelected);
            return;
        }


        console.log('images', images)
        console.log('post images', post.images)

        // const newFiles = [...images];
        // newFiles.splice(images.length - 1, 1)
        // setImages(newFiles)
        // return;

        // const modifiedUploadedImages = [...post.images];
        //     modifiedUploadedImages.splice(post.images.length - 1, 1);
        //     const updatedPost = {
        //         ...post,
        //         ['images']: modifiedUploadedImages
        //     }
        //     setPost(updatedPost)
        //     return;


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

      const finishUpdatePost = async() =>{

        console.log(post, 'post hai bhai')

        console.log('it must go from here')
        console.log(post._id)
        const formData = new FormData();
        formData.append("_id", post._id)
        formData.append("title", post.title);
        formData.append("description", post.description);
        formData.append("images", post.images);
        formData.append("userName", post.userName);
        formData.append("attachedFields", post.attachedFields);
        formData.append("createdDate", post.createdDate);

        console.log('called update function')
        const response = await API.updatePost(formData);
        if(response.isSuccess){
             navigate(`/details/${post._id}`);
        }

        console.log(post)
      }




      const handleUpdatePost = async() =>{

        console.log('username', account.userName)
        console.log('length of images', images.length)
        if(images.length > 0){
            console.log('reached')
           const responses = await handleFileUploading();
           const updatedIntialPost = {
            ...intialPost, 
            ['images']: [...responses.data.imageUrls, ...intialPost.images],
            ['userName']: account.userName
           }
           console.log(updatedIntialPost, 'updated after image urls came from server')
           setIntialPost({
            ...updatedIntialPost
           })
           setNewAddedImages([...responses.data.imageUrls])
           console.log('before my condn..', intialPost)
           if(intialPost.createdDate === null || intialPost.userName === ''){
            console.log('its being run broski, it must not be null')
            console.log([...responses.data.imageUrls, ...post.images], 'brev')
                const updatedIntialPost = {
                    ...intialPost,
                    ['images'] : [...responses.data.imageUrls, ...intialPost.images],
                    ['createdDate'] : new Date(),
                    ['userName']: account.userName
                }
           }
           setPost({
            ...updatedIntialPost
        })

        }else{
            const updatedIntialPost = {
                ...intialPost,
                ['userName']: account.userName
               }
               setIntialPost({
                ...updatedIntialPost
               })
               if(intialPost.createdDate == null || intialPost.userName === ''){
                const updatedIntialPost = {
                    ...intialPost,
                    ['createdDate'] : new Date(),
                    ['userName']: account.userName
                }
           }
           setPost({
            ...updatedIntialPost
        })
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
        <InputBox>

        <StyledSelectionTitle>Select the fields your blog is related to:</StyledSelectionTitle>
        <StyledBox>
                {
                    categories.map(category=>{
                        return (
                            <div key={category.id}>
                                <StyledElement style={{background: intialPost.attachedFields.includes(category.type) ? 'green' : 'red'}} onClick={(type) => {select(category.type)}}>
                                {category.type}
                                </StyledElement>
                            </div>
                        )
                    })
                }
        </StyledBox>
        </InputBox>

        <InputBox>
        <StyledTextField placeholder="Enter Title of the post" aria-readonly={false}  value={intialPost.title} InputProps={{style: {height: '40px'}}} onChange={(e) => handleDataInputChnages(e)} name="title"/>
        </InputBox>
        <FormControl>
            <StyledLabel htmlFor="mediaInput">
                <AddAPhotoIcon fontSize="large" color="action"/>
            </StyledLabel>

            <StyledUploadLabel onClick={handleUpdatePost}>Upload</StyledUploadLabel>
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
            value={intialPost.description}
        />
        </InputBox>
        <MediaFilesContainer>
            {
                ((intialPost.images.length + images.length) > 0) &&
                <ImageBox>
                       {[...intialPost.images, ...images].map((imageUrl, index) => (
                        <div>
                            <StyledCloseButton onClick={() => {removeImage(imageUrl)}}>X</StyledCloseButton>
                            <img key={index} src={imageUrl} alt={`Image ${index}`} />
                        </div>
        ))}
                </ImageBox>
            }
      </MediaFilesContainer>
        </Container>
    )

}

export default UpdatePost;