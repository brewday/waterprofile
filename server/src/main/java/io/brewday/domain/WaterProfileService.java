package io.brewday.domain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.mongodb.core.query.Query.query;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Update.update;

@Service
public class WaterProfileService {

    private final MongoOperations mongo;

    @Autowired
    public WaterProfileService(MongoOperations mongo) {
        this.mongo = mongo;
    }

    public List<WaterProfile> findLatest() {
        Query query = query(where("archived").is(false));
        query.with(new Sort(Sort.Direction.DESC, "createdDate"));
        query.limit(10);

        return mongo.find(query, WaterProfile.class);
    }
}
