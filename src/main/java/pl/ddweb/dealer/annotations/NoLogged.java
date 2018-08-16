package pl.ddweb.dealer.annotations;

import java.lang.annotation.*;

/**
 * Created by Karol on 2017-06-06.
 */
@Documented
@Target({ElementType.FIELD, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.ANNOTATION_TYPE,ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface NoLogged {
}
