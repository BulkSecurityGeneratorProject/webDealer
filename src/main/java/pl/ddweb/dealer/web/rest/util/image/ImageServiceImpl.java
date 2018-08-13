package pl.ddweb.dealer.web.rest.util.image;

import org.springframework.stereotype.Service;
import pl.ddweb.dealer.domain.Image;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ImageServiceImpl implements ImageService {

    private ByteArrayInputStream inputStream;

    private BufferedImage bufferedImage;

    private static final int HEIGHT = 200;

    private static final int WIDTH = 200;


    @Override
    public void setMainImage(List<Image> img) {
        if (img.size() > 0) {
            if (!checkMainImage(img)) img.get(0).setMain(true);
        }
    }

    @Override
    public void changeToOptimalImages(List<Image> img) {
        for (Image image : img) {
            image.setImg(cropImage(image.getImg()));
        }
    }

    @Override
    public void changeImagesToSize(List<Image> img) {
        for (Image image : img) {
            image.setThumbnail(cropImage(image.getImg(), ImageServiceImpl.WIDTH, ImageServiceImpl.HEIGHT));
        }
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

    private byte[] cropImage(byte[] image) {
        inputStream = new ByteArrayInputStream(image);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            bufferedImage = ImageIO.read(inputStream);
            BufferedImage bf = Scalr.createOptimalImage(bufferedImage);
            inputStream.close();
            ImageIO.write(bufferedImage, "png", outputStream);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return outputStream.toByteArray();
    }

    private byte[] cropImage(byte[] image, int width, int height) {
        inputStream = new ByteArrayInputStream(image);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            bufferedImage = ImageIO.read(inputStream);
            BufferedImage bf = Scalr.createOptimalImage(bufferedImage, width, height);
            inputStream.close();
            ImageIO.write(bufferedImage, "png", outputStream);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return outputStream.toByteArray();
    }
}
