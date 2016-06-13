package io.brewday.domain;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "waterprofiles")
public class WaterProfile {

    @Id
    private String id;

    @TextIndexed(weight = 2)
    private String city;

    @TextIndexed(weight = 2)
    private String treatmentPlant;

    @TextIndexed(weight = 1)
    private String notes;

    @GeoSpatialIndexed
    private Point position;

    private LocalDate testDate;

    private double ph;
    private double ca;
    private double mg;
    private double na;
    private double s04;
    private double cl;
    private double hc03;

    @DBRef(lazy = true)
    private WaterProfile parent;

    @CreatedDate
    private LocalDateTime createdDate;

    private boolean archived = false;

    //region Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getTreatmentPlant() {
        return treatmentPlant;
    }

    public void setTreatmentPlant(String treatmentPlant) {
        this.treatmentPlant = treatmentPlant;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Point getPosition() {
        return position;
    }

    public void setPosition(Point position) {
        this.position = position;
    }

    public LocalDate getTestDate() {
        return testDate;
    }

    public void setTestDate(LocalDate testDate) {
        this.testDate = testDate;
    }

    public double getPh() {
        return ph;
    }

    public void setPh(double ph) {
        this.ph = ph;
    }

    public double getCa() {
        return ca;
    }

    public void setCa(double ca) {
        this.ca = ca;
    }

    public double getMg() {
        return mg;
    }

    public void setMg(double mg) {
        this.mg = mg;
    }

    public double getNa() {
        return na;
    }

    public void setNa(double na) {
        this.na = na;
    }

    public double getS04() {
        return s04;
    }

    public void setS04(double s04) {
        this.s04 = s04;
    }

    public double getCl() {
        return cl;
    }

    public void setCl(double cl) {
        this.cl = cl;
    }

    public double getHc03() {
        return hc03;
    }

    public void setHc03(double hc03) {
        this.hc03 = hc03;
    }

    public WaterProfile getParent() {
        return parent;
    }

    public void setParent(WaterProfile parent) {
        this.parent = parent;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }

    //endregion
}
