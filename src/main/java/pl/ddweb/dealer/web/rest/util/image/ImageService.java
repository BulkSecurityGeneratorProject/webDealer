package pl.ddweb.dealer.web.rest.util.image;

import pl.ddweb.dealer.domain.Image;

import java.util.List;

public interface ImageService {
    void setMainImage(List<Image> img);
    void changeToOptimalImages(List<Image> img);
    void changeImagesToSize(List<Image> img);
}
