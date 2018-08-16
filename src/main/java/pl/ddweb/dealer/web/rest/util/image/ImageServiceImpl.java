package pl.ddweb.dealer.web.rest.util.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.ddweb.dealer.domain.Image;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageServiceImpl implements ImageService {

    private ByteArrayInputStream inputStream;

    private BufferedImage bufferedImage;

    private SaveImg saveImg;

    @Autowired
    public ImageServiceImpl(SaveImg saveImg) {
        this.saveImg = saveImg;
    }

    @Override
    public void setMainImage(List<Image> img) {
        if (img.size() > 0) {
            if (!checkMainImage(img)) img.get(0).setMain(true);
        }
    }

    @Override
    public void saveChangeImagesToSize(Long carId, List<Image> images) {
        for (Image image : images) {
            saveImg.saveImg(image.getImg(), image.getName(), carId);
        }

    }

    @Override
    public void deleteImages(Long carId, List<Image> images) {
        for (Image image : images) {
            saveImg.deleteImg(image.getName(), carId);
        }
    }

    @Override
    public void deleteCar(Long carId) {
        saveImg.deleteCar(carId);
    }

    @Override
    public void updateImages(Long carId, List<Image> images) {
        List<String> listaNazw =
            images.stream()
                .filter(image -> image.getImg() == null)
                .map(Image::getName)
                .collect(Collectors.toList());// Tylko tych ktore nie maja base64

        List<Image> newImages = images.stream()
            .filter(image -> image.getImg() != null) // tylko te ktore maja base64
            .collect(Collectors.toList());

        saveImg.deleteAllImgsExcept(listaNazw, carId);
        saveChangeImagesToSize(carId, newImages);
    }


    private boolean checkMainImage(List<Image> img) {
        boolean exist = false;
        for (Image image : img) {
            if (image.isMain()) {
                exist = true;
                break;
            }
        }
        return exist;
    }
}
