package pl.ddweb.dealer.web.rest.util.image;

import pl.ddweb.dealer.domain.Image;

import java.util.List;

public interface ImageService {
    void setMainImage(List<Image> img);
    void saveChangeImagesToSize(Long carId, List<Image> images);
    void deleteImages(Long carId, List<Image> images);
    void deleteCar(Long carId);
    void updateImages(Long carId, List<Image> images);
}
