/*
 *  Copyright (C) 2010-2012 Stichting Akvo (Akvo Foundation)
 *
 *  This file is part of Akvo FLOW.
 *
 *  Akvo FLOW is free software: you can redistribute it and modify it under the terms of
 *  the GNU Affero General Public License (AGPL) as published by the Free Software Foundation,
 *  either version 3 of the License or any later version.
 *
 *  Akvo FLOW is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 *  without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *  See the GNU Affero General Public License included below for more details.
 *
 *  The full license text can also be seen at <http://www.gnu.org/licenses/agpl.html>.
 */

package org.waterforpeople.mapping.notification;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;
import java.util.TreeMap;

import com.gallatinsystems.common.objectstore.ObjectStore;
import com.gallatinsystems.common.objectstore.ObjectStore.Container;
import com.gallatinsystems.common.util.MD5Util;
import com.gallatinsystems.common.util.MailUtil;
import com.gallatinsystems.common.util.PropertyUtil;
import com.gallatinsystems.notification.NotificationRequest;
import com.gallatinsystems.notification.dao.NotificationSubscriptionDao;
import com.gallatinsystems.notification.domain.NotificationHistory;
import com.gallatinsystems.survey.dao.SurveyDAO;
import com.gallatinsystems.survey.domain.Survey;

/**
 * base class that supports the generation of a report file. The report file
 * will either be uploaded to OpenStack or emailed as an attachment. If it's uploaded
 * to OpenStack, the notification subscribers will be notified of the url to download
 * the file via email. Subclasses need to simply provide the implementation of
 * writing the report bytes to the print writer instantiated in this class.
 * 
 * @author Christopher Fagiani
 * 
 */
public abstract class AbstractReportNotificationHandler extends
		BaseNotificationHandler {
	private static final String LINK_OPT = "LINK";
	protected static final String DATE_DISPLAY_FORMAT = "MMddyyyy";
	protected static final String ATTACH_REPORT_FLAG = "attachreport";
	
	private ObjectStore mObjectStore;
	private String mReportsContainer;
	
	public AbstractReportNotificationHandler() {
		mObjectStore = ObjectStore.instantiate();
		mReportsContainer = ObjectStore.getContainerName(Container.REPORTS);
	}

	/**
	 * generates the report and sends it as an email attachment
	 * 
	 */
	@Override
	public void generateNotification(String type, Long entityId,
			String destinations, String destOptions, String serverBase) {

		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		PrintWriter pw = new PrintWriter(bos);
		writeReport(entityId, serverBase, pw);

		NotificationHistory hist = getHistory(type, entityId);
		String newChecksum = MD5Util.generateChecksum(bos.toByteArray());
		SurveyDAO surveyDao = new SurveyDAO();
		Survey survey = surveyDao.getById(entityId);
		String emailTitle = getEmailSubject() + survey.getPath() + "/"
				+ survey.getName();
		String emailBody = getEmailBody() + survey.getPath() + "/"
				+ survey.getName() + " ";
		if (bos.size() > 0) {
			if (hist.getChecksum() == null
					|| !hist.getChecksum().equals(newChecksum)) {
				hist.setChecksum(newChecksum);
				TreeMap<String, String> linkAddrList = new TreeMap<String, String>();
				List<String> attachAddrList = new ArrayList<String>();
				StringTokenizer strTok = new StringTokenizer(destinations,
						NotificationRequest.DELIMITER);
				StringTokenizer optTok = new StringTokenizer(destOptions,
						NotificationRequest.DELIMITER);
				while (strTok.hasMoreTokens()) {
					String item = strTok.nextToken();
					String opt = optTok.nextToken();
					if ("false".equalsIgnoreCase(PropertyUtil
							.getProperty(ATTACH_REPORT_FLAG))
							|| LINK_OPT.equalsIgnoreCase(opt)) {
						linkAddrList.put(item, item);
					} else {
						attachAddrList.add(item);
					}
				}

				if (linkAddrList.size() > 0) {
					String fileName = getFileName(entityId.toString());
					try {
						mObjectStore.uploadFile(mReportsContainer, fileName, bos.toByteArray());
					} catch (IOException e) {
						e.printStackTrace();
						throw new RuntimeException("Error uploading file: " + fileName);
					}

					sendMail(
							linkAddrList,
							emailTitle,
							emailBody
									+ ObjectStore.getApiUrl() + "/" + mReportsContainer
									+ "/" + fileName);
				}
				if (attachAddrList.size() > 0) {
					String surveyCodeFormatted = getFileName(entityId
							.toString());
					MailUtil.sendMail(FROM_ADDRESS, attachAddrList, emailTitle,
							emailBody, bos.toByteArray(), surveyCodeFormatted,
							"text/plain");
				}
				NotificationSubscriptionDao.saveNotificationHistory(hist);
			}
		}
		pw.close();
	}

	/**
	 * method responsible for actually writing the bytes of the report 
	 * @param entityId
	 * @param serverBase
	 * @param pw
	 */
	protected abstract void writeReport(Long entityId, String serverBase,
			PrintWriter pw);

	protected abstract String getEmailBody();

	protected abstract String getEmailSubject();

	protected abstract String getFileName(String entityId);

}
