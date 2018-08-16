package pl.ddweb.dealer.web.rest.util.image;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * Created by Karol on 2017-06-12.
 */
@Component
@Profile("dev")
public class DefaultImgUrlDev implements DefaultImgUrl {
    @Override
    public String getUrl() {
        return "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\images\\";
    }
}
