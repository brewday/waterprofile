package io.brewday.beerxml;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * {{
 *     <?xml version="1.0" encoding="ISO-8859-1"?>
 *     <WATERS>
 *         <WATER>
 *         <NAME>Randy Moshers Ideal Pale Ale</NAME>
 *         <VERSION>1</VERSION>
 *         <AMOUNT>56.0000000</AMOUNT>
 *         <CALCIUM>110.0000000</CALCIUM>
 *         <BICARBONATE>0.0000000</BICARBONATE>
 *         <SULFATE>350.0000000</SULFATE>
 *         <CHLORIDE>50.0000000</CHLORIDE>
 *         <SODIUM>17.0000000</SODIUM>
 *         <MAGNESIUM>18.0000000</MAGNESIUM>
 *         <PH>8.2000000</PH>
 *         <NOTES>Skr&#229;msta med en bra Pale Ale profil</NOTES>
 *         <DISPLAY_AMOUNT>56.00 l</DISPLAY_AMOUNT>
 *         </WATER>
 *     </WATERS>
 * }}
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class BeerXmlWater {

    @JsonProperty("NAME")
    private String name;

    @JsonProperty("VERSION")
    private int version;

    @JsonProperty("NOTES")
    private String notes;

    @JsonProperty("AMOUNT")
    private double amount;

    @JsonProperty("PH")
    private double ph;

    @JsonProperty("CALCIUM")
    private double calcium;

    @JsonProperty("BICARBONATE")
    private double bicarbonate;

    @JsonProperty("SULFATE")
    private double sulfate;

    @JsonProperty("CHLORIDE")
    private double chloride;

    @JsonProperty("SODIUM")
    private double sodium;

    @JsonProperty("MAGNESIUM")
    private double magnesium;

    // DISPLAY_AMOUNT

    //<editor-fold desc="Getters and Setters">
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getPh() {
        return ph;
    }

    public void setPh(double ph) {
        this.ph = ph;
    }

    public double getCalcium() {
        return calcium;
    }

    public void setCalcium(double calcium) {
        this.calcium = calcium;
    }

    public double getBicarbonate() {
        return bicarbonate;
    }

    public void setBicarbonate(double bicarbonate) {
        this.bicarbonate = bicarbonate;
    }

    public double getSulfate() {
        return sulfate;
    }

    public void setSulfate(double sulfate) {
        this.sulfate = sulfate;
    }

    public double getChloride() {
        return chloride;
    }

    public void setChloride(double chloride) {
        this.chloride = chloride;
    }

    public double getSodium() {
        return sodium;
    }

    public void setSodium(double sodium) {
        this.sodium = sodium;
    }

    public double getMagnesium() {
        return magnesium;
    }

    public void setMagnesium(double magnesium) {
        this.magnesium = magnesium;
    }
    //</editor-fold>
}
