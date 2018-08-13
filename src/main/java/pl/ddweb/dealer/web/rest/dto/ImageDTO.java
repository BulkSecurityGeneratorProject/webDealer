package pl.ddweb.dealer.web.rest.dto;

import pl.ddweb.dealer.domain.Car;

public class ImageDTO {

    private final Long id;

    private final byte[] thumbnail;

    private final boolean isMain;

    private final String imgContentType;

    private final Car car;


    public ImageDTO(Long id, byte[] thumbnail, boolean isMain, String imgContentType, Car car) {
        this.id = id;
        this.thumbnail = thumbnail;
        this.isMain = isMain;
        this.imgContentType = imgContentType;
        this.car = car;
    }

    public Long getId() {
        return id;
    }

    public byte[] getThumbnail() {
        return thumbnail;
    }

    public boolean isMain() {
        return isMain;
    }

    public String getImgContentType() {
        return imgContentType;
    }

    public Car getCar() {
        return car;
    }
}
