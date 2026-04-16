package com.sujan.ecommerce.model;

import jakarta.persistence.*;

@Entity
@Table(name = "image_model")
public class ImageModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String imageName;
    private String type;

    @Column(length = 50000000)
    private byte[] picByte;

    public ImageModel(){

    }

    public ImageModel(String imageName, String type, byte[] picByte) {
        this.imageName = imageName;
        this.type = type;
        this.picByte = picByte;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getPicByte() {
        return picByte;
    }

    public void setPicByte(byte[] picByte) {
        this.picByte = picByte;
    }
}
