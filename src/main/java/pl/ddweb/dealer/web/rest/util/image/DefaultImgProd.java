package pl.ddweb.dealer.web.rest.util.image;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * Created by Karol on 2017-06-12.
 */
@Component
@Profile("prod")
public class DefaultImgProd implements DefaultImgUrl {

    @Override
    public String getUrl() {
        return "/opt/tomcat/webapps/images/";
    }
}
