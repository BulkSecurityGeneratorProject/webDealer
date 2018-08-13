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

    private static final int THUMB_WIDTH = 400;

    private static final int THUMB_HEIGHT = 400;

    private static final int WIDTH = 1024;

    private static final int HEIGHT = 768;


    @Override
    public void setMainImage(List<Image> img) {
        if (img.size() > 0) {
            if (!checkMainImage(img)) img.get(0).setMain(true);
        }
    }

    @Override
    public void changeImagesToSize(List<Image> img, ImageResizeType imageResizeType) {
        if (ImageResizeType.THUMB == imageResizeType) {
            for (Image image : img) {
                image.setThumbnail(cropImage(image.getImg(), ImageServiceImpl.THUMB_WIDTH, ImageServiceImpl.THUMB_HEIGHT));
            }
        } else {
            for (Image image : img) {
                image.setImg(cropImage(image.getImg(), ImageServiceImpl.WIDTH, ImageServiceImpl.HEIGHT));
            }

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

    private byte[] cropImage(byte[] image, int width, int height) {
        inputStream = new ByteArrayInputStream(image);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            bufferedImage = ImageIO.read(inputStream);
            BufferedImage bf = Scalr.resize(bufferedImage, Scalr.Method.BALANCED, width, height);
            inputStream.close();
            ImageIO.write(bf, "png", outputStream);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return outputStream.toByteArray();
    }

    public enum ImageResizeType {
        MAIN, THUMB
    }
}
