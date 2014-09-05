package com.gallatinsystems.events;

import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.logging.Level;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.logging.Logger;

import com.gallatinsystems.surveyal.app.web.KafkaRestServlet;

public class Kafka {
	private static final Logger log = Logger
	            .getLogger(KafkaRestServlet.class.getName());
	 
	public static void dispatch(String topic, String message){
		 try {
	            URL url = new URL("http://flowdev1.akvo.org:3030/emit");
	            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
	            connection.setDoOutput(true);
	            connection.setRequestMethod("POST");
	            connection.setRequestProperty("Content-Type", "application/json");

	            OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream());
	            writer.write(message);
	            writer.close();
	    
	            if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
	            	log.log(Level.INFO, "kafka message written successfully");
	            } else {
	            	log.log(Level.SEVERE, "kafka message failed");
	            }
	        } catch (MalformedURLException e) {
	        	log.log(Level.SEVERE, "kafka message failed with malformed URL exception");
	        } catch (IOException e) {
	        	log.log(Level.SEVERE, "kafka message failed with IO exception");
	        }	
	}
}