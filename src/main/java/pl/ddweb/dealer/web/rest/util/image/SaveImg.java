package pl.ddweb.dealer.web.rest.util.image;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

/**
 * Created by Karol on 2017-06-06.
 */
@Component
public class SaveImg {

    private ByteArrayInputStream inputStream;

    private BufferedImage bufferedImage;

    private String DEFAULT_IMAGE_PATH;

    private String DEFAULT_IMAGE_TYPE = "png";

    private static final int THUMB_WIDTH = 400;

    private static final int THUMB_HEIGHT = 400;

    private static final int MEDIUM_WIDTH = 600;

    private static final int MEDIUM_HEIGHT = 400;

    private static final int LARGE_WIDTH = 1024;

    private static final int LARGE_HEIGHT = 768;

    @Autowired
    public SaveImg(DefaultImgUrl defaultImgUrl) {
        this.DEFAULT_IMAGE_PATH = defaultImgUrl.getUrl();
    }


    public void saveImg(byte[] image, String name, Long carId) {
        inputStream = new ByteArrayInputStream(image);
        String DEFAULT_IMAGE_PATH_SMALL = DEFAULT_IMAGE_PATH + "cars/" + carId + "/thumbnails",
            DEFAULT_IMAGE_PATH_MEDIUM = DEFAULT_IMAGE_PATH + "cars/" + carId + "/mediums",
            DEFAULT_IMAGE_PATH_LARGE = DEFAULT_IMAGE_PATH + "cars/" + carId + "/larges";
        try {
            new File(DEFAULT_IMAGE_PATH_SMALL).mkdirs();
            new File(DEFAULT_IMAGE_PATH_MEDIUM).mkdirs();
            new File(DEFAULT_IMAGE_PATH_LARGE).mkdirs();
            bufferedImage = ImageIO.read(inputStream);
            File outputFile = new File(DEFAULT_IMAGE_PATH_LARGE + "/" + name + "." + DEFAULT_IMAGE_TYPE);
            ImageIO.write(bufferedImage, DEFAULT_IMAGE_TYPE, outputFile);
            BufferedImage medium = Scalr.resize(bufferedImage, Scalr.Mode.FIT_EXACT, MEDIUM_WIDTH, MEDIUM_HEIGHT);
            BufferedImage small = Scalr.resize(bufferedImage, Scalr.Mode.FIT_EXACT, THUMB_WIDTH, THUMB_HEIGHT);
            inputStream.close();
            outputFile = new File(DEFAULT_IMAGE_PATH_MEDIUM + "/" + name + "." + DEFAULT_IMAGE_TYPE);
            ImageIO.write(medium, DEFAULT_IMAGE_TYPE, outputFile);
            outputFile = new File(DEFAULT_IMAGE_PATH_SMALL + "/" + name + "." + DEFAULT_IMAGE_TYPE);
            ImageIO.write(small, DEFAULT_IMAGE_TYPE, outputFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void deleteImg(String name, Long carId) {
        String DEFAULT_IMAGE_PATH_SMALL = DEFAULT_IMAGE_PATH + "cars/" + carId + "/thumbnails/",
            DEFAULT_IMAGE_PATH_MEDIUM = DEFAULT_IMAGE_PATH + "cars/" + carId + "/mediums/",
            DEFAULT_IMAGE_PATH_LARGE = DEFAULT_IMAGE_PATH + "cars/" + carId + "/larges/";
        try {
            if (checkImgExist(name, carId)) {
                Files.delete(Paths.get(DEFAULT_IMAGE_PATH_SMALL + name + "." + DEFAULT_IMAGE_TYPE));
                Files.delete(Paths.get(DEFAULT_IMAGE_PATH_MEDIUM + name + "." + DEFAULT_IMAGE_TYPE));
                Files.delete(Paths.get(DEFAULT_IMAGE_PATH_LARGE + name + "." + DEFAULT_IMAGE_TYPE));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void deleteCar(Long id) {
        String DEFAULT_IMAGE_PATH_CAR = DEFAULT_IMAGE_PATH + "cars/" + id;
        try {
            FileUtils.deleteDirectory(new File(DEFAULT_IMAGE_PATH_CAR));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //    @NoLogged
//    public byte[] getBase64ofImage(Long Id) {
//        BufferedImage bufferedImage = null;
//        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//        try {
//            bufferedImage = ImageIO.read(new File(PATH + Id + "." + DEFAULT_IMAGE_TYPE));
//            ImageIO.write(bufferedImage, DEFAULT_IMAGE_TYPE, outputStream);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        return outputStream.toByteArray();
//
//    }
    public boolean checkImgExist(String name, Long carId) {
        String DEFAULT_IMAGE_PATH_LARGE = DEFAULT_IMAGE_PATH + "cars/" + carId + "/larges/";
        File file = new File(DEFAULT_IMAGE_PATH_LARGE + name + "." + DEFAULT_IMAGE_TYPE);
        return file.exists() && !file.isDirectory();
    }

    public void deleteAllImgsExcept(List<String> listaNazw, Long carId) {
        String DEFAULT_IMAGE_PATH_SMALL = DEFAULT_IMAGE_PATH + "cars/" + carId + "/thumbnails/",
            DEFAULT_IMAGE_PATH_MEDIUM = DEFAULT_IMAGE_PATH + "cars/" + carId + "/mediums/",
            DEFAULT_IMAGE_PATH_LARGE = DEFAULT_IMAGE_PATH + "cars/" + carId + "/larges/";

        File folder = new File(DEFAULT_IMAGE_PATH_LARGE);
        File[] listOfFiles = folder.listFiles();

        for (int i = 0; i < Objects.requireNonNull(listOfFiles).length; i++) {
            if (listOfFiles[i].isFile()) {
                if (!listaNazw.contains(listOfFiles[i].getName().substring(0, listOfFiles[i].getName().lastIndexOf('.')))) { // Dluga linijka bo usuwamy rozszerznie .png w celu porownania nazw plikow
                    try {
                        Files.delete(Paths.get(DEFAULT_IMAGE_PATH_SMALL + listOfFiles[i].getName()));
                        Files.delete(Paths.get(DEFAULT_IMAGE_PATH_MEDIUM + listOfFiles[i].getName()));
                        Files.delete(Paths.get(DEFAULT_IMAGE_PATH_LARGE + listOfFiles[i].getName()));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }

        }
    }
}
