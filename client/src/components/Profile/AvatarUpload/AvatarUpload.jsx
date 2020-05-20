import React from 'react'
import axios from 'axios'
import DefaultImg from '../../../assets/images/unknown_user1.png'
import './AvatarUpload.css'

class AvatarUpload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar: DefaultImg,
        }
    }

    setDefaultImage(uploadType) {
        if (uploadType === "multer") {
            this.setState({
                avatar: DefaultImg
            });
        }
    }

    uploadImage(e, method) {
        if (method === "multer") {
            let imageFormObj = new FormData();

            imageFormObj.append("imageName", "multer-image-" + Date.now());
            imageFormObj.append("imageData", e.target.files[0]);

            this.setState({
                avatar: URL.createObjectURL(e.target.files[0])
            });

            axios.post(`http://localhost:4000/api/avatar/upload/${this.props.match.params.userId}`, imageFormObj)
                .then((response) => {
                    if (response.data.success) {
                        alert("Image has been successfully uploaded!")
                        this.setDefaultImage("multer")
                    }
                })
                .catch(error => {
                    alert("Error: " + error)
                    this.setDefaultImage("multer")
                });
        }
    }

    render() {
        return (
            <div className="container-block">
                <div className="upload">
                    <div>Avatar Upload</div>
                    <div><img src={this.state.avatar} alt="uploadImage" /></div>
                    <div><input type="file" onChange={(e) => this.uploadImage(e, "multer")} /></div>
                </div>
            </div>
        )
    }
}

export default AvatarUpload;