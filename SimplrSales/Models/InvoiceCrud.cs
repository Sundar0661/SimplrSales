//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;


using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using SimplrXMLSFTP.Models;
using SimplrXMLSFTP;
using System.Xml.Serialization;
using System.IO;
using System.Xml.Linq;
using System.Globalization;
using System.Net.Http;
using System.Text;
using System.Net;
using System.Xml;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace SimplrSales.Models
{

    public class InvoiceCrud
    {
        //public static string Outbound(string _invoiceNo, string _path)
        //{
        //    DataTable dtHdr = new DataTable();
        //    DataSet dsHdr = new DataSet();
        //    dtHdr.Clear();
        //    dsHdr.Clear();
        //    string sSQL = "Select GST, CompanyName, Header1, Header2 ,Header3, Header4 as EAddress , Tail1 as Email, Tail2 as Mobile,Tail3 as PinCode,Tail4 as ContactPerson from System ";
        //    ClsCommon.da.SelectCommand = new SqlCommand(sSQL, ClsCommon.SimplrConnection);
        //    ClsCommon.da.Fill(dsHdr, "tblSupHdr");
        //    dtHdr = dsHdr.Tables["tblSupHdr"];
        //    Supplier _supplier = new Supplier();
        //    if (dtHdr.Rows.Count > 0)
        //    {

        //        for (int i = 0; i <= dtHdr.Rows.Count - 1; i++)
        //        {

        //            _supplier.CompanyName = dtHdr.Rows[i]["CompanyName"].ToString();
        //            _supplier.GST = dtHdr.Rows[i]["GST"].ToString();
        //            _supplier.Header1 = dtHdr.Rows[i]["Header1"].ToString();
        //            _supplier.Header2 = dtHdr.Rows[i]["Header2"].ToString();
        //            _supplier.Header3 = dtHdr.Rows[i]["Header3"].ToString();
        //            _supplier.EAddress = dtHdr.Rows[i]["EAddress"].ToString();
        //            _supplier.Mobile = dtHdr.Rows[i]["Mobile"].ToString();
        //            _supplier.Email = dtHdr.Rows[i]["Email"].ToString();
        //            _supplier.PinCode = dtHdr.Rows[i]["PinCode"].ToString();
        //            _supplier.ContactPerson = dtHdr.Rows[i]["ContactPerson"].ToString();
        //            _supplier.PinCode = dtHdr.Rows[i]["PinCode"].ToString();
        //        }
        //    }


        //    dtHdr.Clear();
        //    dsHdr.Clear();
        //    sSQL = "Select IV.InvNo, IV.InvDt, IV.OrdNo, IV.DONo, IV.DODt, IV.CustId, C.CustName, C.Address as Address1, C.Address2, C.City, C.PostCode as PinCode, C.CountryCode, C.Phone, C.ContactPerson, C.Email, C.PaymentTerms, IV.Discount, IV.SubTotal, IV.GstAmt as GstAmount, IV.TotalAmt as TotalAmount From Invoice IV Inner Join Customer C On IV.CustId = C.CustNo where IV.InvNo = " + ClsCommon.SafeSql(_invoiceNo.ToString());
        //    ClsCommon.da.SelectCommand = new SqlCommand(sSQL, ClsCommon.SimplrConnection);
        //    ClsCommon.da.Fill(dsHdr, "tblInvHdr");
        //    dtHdr = dsHdr.Tables["tblInvHdr"];
        //    IList<InvoiceHdr> _invHdrlist = new List<InvoiceHdr>();
        //    if (dtHdr.Rows.Count > 0)
        //    {

        //        InvoiceHdr _invHdr = null;
        //        for (int i = 0; i <= dtHdr.Rows.Count - 1; i++)
        //        {
        //            _invHdr = new InvoiceHdr();
        //            _invHdr.InvNo = dtHdr.Rows[i]["InvNo"].ToString();
        //            _invHdr.InvDt = Convert.ToDateTime(dtHdr.Rows[i]["InvDt"]);
        //            _invHdr.DueDt = Convert.ToDateTime(dtHdr.Rows[i]["InvDt"]);
        //            _invHdr.OrdNo = dtHdr.Rows[i]["OrdNo"].ToString();
        //            _invHdr.DONo = dtHdr.Rows[i]["DONo"].ToString();
        //            _invHdr.DODt = Convert.ToDateTime(dtHdr.Rows[i]["DODt"]);
        //            _invHdr.CustomerNo = dtHdr.Rows[i]["CustId"].ToString();
        //            _invHdr.CustomerName = dtHdr.Rows[i]["CustName"].ToString();
        //            _invHdr.Address1 = dtHdr.Rows[i]["Address1"].ToString();
        //            _invHdr.Address2 = dtHdr.Rows[i]["Address2"].ToString();
        //            _invHdr.City = dtHdr.Rows[i]["City"].ToString();
        //            _invHdr.PinCode = Convert.ToInt32(dtHdr.Rows[i]["PinCode"]);
        //            _invHdr.Phone = dtHdr.Rows[i]["Phone"].ToString();
        //            _invHdr.Email = dtHdr.Rows[i]["Email"].ToString();
        //            _invHdr.CountryCode = dtHdr.Rows[i]["CountryCode"].ToString();
        //            _invHdr.PaymentTerms = dtHdr.Rows[i]["PaymentTerms"].ToString();
        //            _invHdr.GSTAmount = Convert.ToDouble(dtHdr.Rows[i]["GSTAmount"]);
        //            _invHdr.TotalAmount = Convert.ToDouble(dtHdr.Rows[i]["TotalAmount"]);
        //            _invHdr.SubTotal = Convert.ToDouble(dtHdr.Rows[i]["SubTotal"]);


        //            DataTable dtLine = new DataTable();
        //            DataSet dsLine = new DataSet();
        //            dtLine.Clear();
        //            dsLine.Clear();

        //            sSQL = " Select II.ItemNo, IT.Description, II.UOM, II.Price, II.Qty, II.SubAmt, II.[LineNo], II.DisPer, II.Discount  from InvItem II Inner Join Item IT On II.ItemNo = IT.ItemNo Where II.InvNo =  " + ClsCommon.SafeSql(_invHdr.InvNo);
        //            ClsCommon.da.SelectCommand = new SqlCommand(sSQL, ClsCommon.SimplrConnection);
        //            ClsCommon.da.Fill(dsLine, "tblInvItem");
        //            dtLine = dsLine.Tables["tblInvItem"];

        //            IList<InvItem> _invLinelist = new List<InvItem>();
        //            InvItem _invLine = null;

        //            for (int j = 0; j <= dtLine.Rows.Count - 1; j++)
        //            {
        //                _invLine = new InvItem();

        //                _invLine.ItemNo = dtLine.Rows[j]["ItemNo"].ToString();
        //                _invLine.ItemName = dtLine.Rows[j]["Description"].ToString();
        //                _invLine.UOM = dtLine.Rows[j]["UOM"].ToString();
        //                _invLine.Price = Convert.ToDouble(dtLine.Rows[j]["Price"]);
        //                _invLine.Qty = Convert.ToDouble(dtLine.Rows[j]["Qty"]);
        //                _invLine.SubAmt = Convert.ToDouble(dtLine.Rows[j]["SubAmt"]);
        //                _invLine.LineNo = Convert.ToInt32(dtLine.Rows[j]["LineNo"]);
        //                _invLine.DisPer = Convert.ToDouble(dtLine.Rows[j]["DisPer"]);
        //                _invLine.Discount = Convert.ToDouble(dtLine.Rows[j]["Discount"]);

        //                _invLinelist.Add(_invLine);

        //            }

        //            _invHdr.InvItems = _invLinelist;
        //            _invHdrlist.Add(_invHdr);

        //        }
        //        string _status = string.Empty;
        //        string _docid = string.Empty;
        //        try
        //        {
        //            //string baseAddress = "https://api.ap-connect.dev.einvoice.sg/";
        //            string baseAddress = "https://api.ap-connect.einvoice.sg/";
        //            string pathURL = "v1/invoice/outbound/upload/?";
        //            string xmlData = string.Empty;
        //            xmlData = @"{ 'modifiedDate': }";
        //            foreach (var _xmlinvHdr in _invHdrlist)
        //            {
        //                StringBuilder _builder = new StringBuilder();
        //                _builder.AppendLine("<?xml version='1.0' encoding='UTF-8'?>");
        //                _builder.AppendLine("<StandardBusinessDocument xmlns:xs='http://www.w3.org/2001/XMLSchema' xmlns = 'http://www.unece.org/cefact/namespaces/StandardBusinessDocumentHeader'>");
        //                _builder.AppendLine("<StandardBusinessDocumentHeader><HeaderVersion>1.0</HeaderVersion>");
        //                _builder.AppendLine("<Sender>");
        //                //Commented by Jenietta changed SGUEN201209520R to SGTSTIMDADEMO02
        //                //    _builder.AppendLine("<Identifier Authority='iso6523-actorid-upis'>0195:SGUEN201209520R</Identifier>");
        //                _builder.AppendLine("<Identifier Authority='iso6523-actorid-upis'>0195:SGTSTIMDADEMO02</Identifier>");
        //                //Gopal 22-09-2021//_builder.AppendLine("<Identifier Authority='iso6523-actorid-upis'>0195:SGTSTIMDADEMO02</Identifier>");
        //                //_builder.AppendLine("<Identifier Authority='iso6523-actorid-upis'>0195:SGTSTIMDADEMO01</Identifier>");
        //                _builder.AppendLine("</Sender>");
        //                _builder.AppendLine("<Receiver>");
        //                //_builder.AppendLine("<Identifier Authority='iso6523-actorid-upis'>0195:SGUEN201209520R</Identifier>");
        //                _builder.AppendLine("<Identifier Authority='iso6523-actorid-upis'>0195:SGTSTIMDADEMO02</Identifier>");
        //                //_builder.AppendLine("<Identifier Authority='iso6523-actorid-upis'>0195:SGTSTIMDADEMO01</Identifier>");
        //                _builder.AppendLine("</Receiver>");
        //                _builder.AppendLine("<DocumentIdentification>");
        //                _builder.AppendLine("<Standard>urn:oasis:names:specification:ubl:schema:xsd:Invoice-2</Standard>");
        //                _builder.AppendLine("<TypeVersion>2.1</TypeVersion>");
        //                _builder.AppendLine("<InstanceIdentifier>b0f952ba-df85-450a-b543-8fddc362c277</InstanceIdentifier>");
        //                _builder.AppendLine("<Type>Invoice</Type>");
        //                _builder.AppendLine("<CreationDateAndTime>" + DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss+00:00") + "</CreationDateAndTime>");
        //                _builder.AppendLine("</DocumentIdentification>");
        //                _builder.AppendLine("<BusinessScope>");
        //                _builder.AppendLine("<Scope>");
        //                _builder.AppendLine("<Type>DOCUMENTID</Type>");
        //                _builder.AppendLine("<InstanceIdentifier>urn:oasis:names:specification:ubl:schema:xsd:Invoice-2::Invoice##urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:sg:3.0::2.1</InstanceIdentifier>");
        //                _builder.AppendLine("<Identifier>busdox-docid-qns</Identifier>");
        //                _builder.AppendLine("</Scope>");
        //                _builder.AppendLine("<Scope>");
        //                _builder.AppendLine("<Type>PROCESSID</Type>");
        //                _builder.AppendLine("<InstanceIdentifier>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</InstanceIdentifier>");
        //                _builder.AppendLine("<Identifier>cenbii-procid-ubl</Identifier>");
        //                _builder.AppendLine("</Scope>");
        //                _builder.AppendLine("</BusinessScope>");
        //                _builder.AppendLine("</StandardBusinessDocumentHeader>");
        //                _builder.AppendLine("<Invoice xmlns:cbc='urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2'");
        //                _builder.AppendLine("xmlns:cac='urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2'");
        //                _builder.AppendLine("xmlns='urn:oasis:names:specification:ubl:schema:xsd:Invoice-2'");
        //                _builder.AppendLine("xmlns:ext='urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2'");
        //                _builder.AppendLine("xmlns:ccts='urn:un:unece:uncefact:documentation:2'");
        //                _builder.AppendLine("xmlns:qdt='urn:oasis:names:specification:ubl:schema:xsd:QualifiedDatatypes-2'");
        //                _builder.AppendLine("xmlns:udt='urn:un:unece:uncefact:data:specification:UnqualifiedDataTypesSchemaModule:2' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:xsi='http:www.w3.org/2001/XMLSchema-instance'>");
        //                _builder.AppendLine("<cbc:UBLVersionID>2.1</cbc:UBLVersionID>");
        //                _builder.AppendLine("<cbc:CustomizationID>urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:sg:3.0</cbc:CustomizationID>");
        //                _builder.AppendLine("<cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>");
        //                _builder.AppendLine("<cbc:ID>" + _xmlinvHdr.InvNo + "</cbc:ID>");
        //                _builder.AppendLine("<cbc:IssueDate>" + Convert.ToDateTime(_xmlinvHdr.InvDt).ToString("yyyy-MM-dd") + "</cbc:IssueDate>");
        //                _builder.AppendLine("<cbc:DueDate>" + Convert.ToDateTime(_xmlinvHdr.DueDt).ToString("yyyy-MM-dd") + "</cbc:DueDate>");
        //                _builder.AppendLine("<cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>");
        //                _builder.AppendLine("<cbc:DocumentCurrencyCode>SGD</cbc:DocumentCurrencyCode>");
        //                _builder.AppendLine("<cbc:AccountingCost>102035</cbc:AccountingCost>");
        //                _builder.AppendLine("<cbc:BuyerReference>123</cbc:BuyerReference>");
        //                _builder.AppendLine("<cac:InvoicePeriod>");
        //                _builder.AppendLine("<cbc:StartDate>" + Convert.ToDateTime(_xmlinvHdr.InvDt).ToString("yyyy-MM-dd") + "</cbc:StartDate>");
        //                _builder.AppendLine("<cbc:EndDate>" + Convert.ToDateTime(_xmlinvHdr.InvDt).ToString("yyyy-MM-dd") + "</cbc:EndDate> ");
        //                _builder.AppendLine("</cac:InvoicePeriod>");
        //                _builder.AppendLine("<cac:OrderReference>");
        //                _builder.AppendLine("<cbc:ID>" + _xmlinvHdr.OrdNo + "</cbc:ID>");
        //                _builder.AppendLine("<cbc:SalesOrderID>" + _xmlinvHdr.OrdNo + "</cbc:SalesOrderID>");
        //                _builder.AppendLine("</cac:OrderReference>");
        //                _builder.AppendLine("<cac:BillingReference>");
        //                _builder.AppendLine("<cac:InvoiceDocumentReference>");
        //                _builder.AppendLine("<cbc:ID>" + _xmlinvHdr.InvNo + "</cbc:ID>");
        //                _builder.AppendLine("<cbc:IssueDate>" + _xmlinvHdr.InvDt.ToString("yyyy-MM-dd") + "</cbc:IssueDate>");
        //                _builder.AppendLine("</cac:InvoiceDocumentReference>");
        //                _builder.AppendLine("</cac:BillingReference>");
        //                _builder.AppendLine("<cac:DespatchDocumentReference>");
        //                _builder.AppendLine("<cbc:ID>" + _xmlinvHdr.DONo + "</cbc:ID>");
        //                _builder.AppendLine("</cac:DespatchDocumentReference>");
        //                _builder.AppendLine("<cac:ReceiptDocumentReference>");
        //                _builder.AppendLine("<cbc:ID>654</cbc:ID>");
        //                _builder.AppendLine("</cac:ReceiptDocumentReference>");
        //                _builder.AppendLine("<cac:OriginatorDocumentReference>");
        //                _builder.AppendLine("<cbc:ID>753</cbc:ID>");
        //                _builder.AppendLine("</cac:OriginatorDocumentReference>");
        //                _builder.AppendLine("<cac:ContractDocumentReference>");
        //                _builder.AppendLine("<cbc:ID>Contract321</cbc:ID>");
        //                _builder.AppendLine("</cac:ContractDocumentReference>");
        //                //_builder.AppendLine("<cac:AdditionalDocumentReference>");
        //                //_builder.AppendLine("<cbc:ID>doc2</cbc:ID>");
        //                //_builder.AppendLine("<cbc:DocumentDescription>Incoming File</cbc:DocumentDescription>");
        //                //_builder.AppendLine("<cac:Attachment>");
        //                //_builder.AppendLine("<cbc:EmbeddedDocumentBinaryObject filename='inbound.pdf' mimeCode='application/pdf'>Inbound</cbc:EmbeddedDocumentBinaryObject>");
        //                //_builder.AppendLine("</cac:Attachment>");
        //                //_builder.AppendLine("</cac:AdditionalDocumentReference>");
        //                _builder.AppendLine("<cac:AccountingSupplierParty>");
        //                _builder.AppendLine("<cac:Party>");
        //                //Gopal 22-09-2021//_builder.AppendLine("<cbc:EndpointID schemeID = '0088'>5790000436064</cbc:EndpointID>");
        //                _builder.AppendLine("<cbc:EndpointID schemeID = '0195'>SGUEN201209520R</cbc:EndpointID>");
        //                _builder.AppendLine("<cac:PartyIdentification>");
        //                _builder.AppendLine("<cbc:ID schemeID = '0035'>5790000436071</cbc:ID>");
        //                _builder.AppendLine("</cac:PartyIdentification>");
        //                _builder.AppendLine("<cac:PartyName>");
        //                _builder.AppendLine("<cbc:Name>" + _supplier.CompanyName + "</cbc:Name>");
        //                _builder.AppendLine("</cac:PartyName>");
        //                _builder.AppendLine("<cac:PostalAddress>");
        //                _builder.AppendLine("<cbc:StreetName>" + _supplier.Header1 + "</cbc:StreetName>");
        //                _builder.AppendLine("<cbc:AdditionalStreetName>" + _supplier.Header1 + "</cbc:AdditionalStreetName>");
        //                _builder.AppendLine("<cbc:CityName>" + _supplier.Header2 + "</cbc:CityName>");
        //                _builder.AppendLine("<cbc:PostalZone>" + _supplier.PinCode + "</cbc:PostalZone>");
        //                _builder.AppendLine("<cbc:CountrySubentity>Singapore</cbc:CountrySubentity>");
        //                _builder.AppendLine("<cac:AddressLine>");
        //                _builder.AppendLine("<cbc:Line>Sales department</cbc:Line>");
        //                _builder.AppendLine("</cac:AddressLine>");
        //                _builder.AppendLine("<cac:Country>");
        //                _builder.AppendLine("<cbc:IdentificationCode>SG</cbc:IdentificationCode>");
        //                _builder.AppendLine("</cac:Country>");
        //                _builder.AppendLine("</cac:PostalAddress>");
        //                _builder.AppendLine("<cac:PartyLegalEntity>");
        //                _builder.AppendLine("<cbc:RegistrationName>" + _supplier.CompanyName + "</cbc:RegistrationName>");
        //                _builder.AppendLine("</cac:PartyLegalEntity>");
        //                _builder.AppendLine("<cac:Contact>");
        //                _builder.AppendLine("<cbc:Name>" + _supplier.ContactPerson + "</cbc:Name>");
        //                _builder.AppendLine("<cbc:Telephone>" + _supplier.Mobile + "</cbc:Telephone>");
        //                _builder.AppendLine("<cbc:ElectronicMail>" + _supplier.Email + "</cbc:ElectronicMail>");
        //                _builder.AppendLine("</cac:Contact>");
        //                _builder.AppendLine("</cac:Party>");
        //                _builder.AppendLine("</cac:AccountingSupplierParty>");
        //                _builder.AppendLine("<cac:AccountingCustomerParty>");
        //                _builder.AppendLine("<cac:Party>");
        //                //Gopal 22-09-2021//_builder.AppendLine("<cbc:EndpointID schemeID = '0088'>" + _xmlinvHdr.CustomerNo + "</cbc:EndpointID>");
        //                _builder.AppendLine("<cbc:EndpointID schemeID = '0195'>SGTSTIMDADEMO02</cbc:EndpointID>");
        //                _builder.AppendLine("<cac:PartyIdentification>");
        //                _builder.AppendLine("<cbc:ID schemeID = '0035'>" + _xmlinvHdr.CustomerNo + "</cbc:ID>");
        //                _builder.AppendLine("</cac:PartyIdentification>");
        //                _builder.AppendLine("<cac:PartyName>");
        //                _builder.AppendLine("<cbc:Name>" + _xmlinvHdr.CustomerName + "</cbc:Name>");
        //                _builder.AppendLine("</cac:PartyName>");
        //                _builder.AppendLine("<cac:PostalAddress>");
        //                _builder.AppendLine("<cbc:StreetName>" + _xmlinvHdr.Address1 + "</cbc:StreetName>");
        //                _builder.AppendLine("<cbc:AdditionalStreetName>" + _xmlinvHdr.Address2 + "</cbc:AdditionalStreetName>");
        //                _builder.AppendLine("<cbc:CityName>Singapore</cbc:CityName>");
        //                _builder.AppendLine("<cbc:PostalZone>" + _xmlinvHdr.PinCode + "</cbc:PostalZone>");
        //                _builder.AppendLine("<cbc:CountrySubentity>" + _xmlinvHdr.CountryCode + "</cbc:CountrySubentity>");
        //                _builder.AppendLine("<cac:AddressLine>");
        //                _builder.AppendLine("<cbc:Line>Accounting department</cbc:Line>");
        //                _builder.AppendLine("</cac:AddressLine >");
        //                _builder.AppendLine("<cac:Country>");
        //                _builder.AppendLine("<cbc:IdentificationCode>SG</cbc:IdentificationCode>");
        //                _builder.AppendLine("</cac:Country>");
        //                _builder.AppendLine("</cac:PostalAddress>");
        //                _builder.AppendLine("<cac:PartyLegalEntity>");
        //                _builder.AppendLine("<cbc:RegistrationName>Renewal-SIMPLR-IMDA</cbc:RegistrationName>");
        //                _builder.AppendLine("</cac:PartyLegalEntity>");
        //                _builder.AppendLine("<cac:Contact>");
        //                _builder.AppendLine("<cbc:Name>" + _xmlinvHdr.ContactPerson + "</cbc:Name>");
        //                _builder.AppendLine("<cbc:Telephone>" + _xmlinvHdr.Phone + "</cbc:Telephone>");
        //                _builder.AppendLine("<cbc:ElectronicMail>" + _xmlinvHdr.Email + "</cbc:ElectronicMail>");
        //                _builder.AppendLine("</cac:Contact>");
        //                _builder.AppendLine("</cac:Party>");
        //                _builder.AppendLine("</cac:AccountingCustomerParty>");
        //                _builder.AppendLine("<cac:PayeeParty>");
        //                _builder.AppendLine("<cac:PartyIdentification>");
        //                _builder.AppendLine("<cbc:ID schemeID = '0035'>Payee</cbc:ID>");
        //                _builder.AppendLine("</cac:PartyIdentification>");
        //                _builder.AppendLine("<cac:PartyName>");
        //                _builder.AppendLine("<cbc:Name></cbc:Name>");
        //                _builder.AppendLine("</cac:PartyName>");
        //                _builder.AppendLine("<cac:PartyLegalEntity>");
        //                _builder.AppendLine("<cbc:CompanyID></cbc:CompanyID>");
        //                _builder.AppendLine("</cac:PartyLegalEntity>");
        //                _builder.AppendLine("</cac:PayeeParty>");
        //                _builder.AppendLine("<cac:Delivery>");
        //                _builder.AppendLine("<cbc:ActualDeliveryDate>" + Convert.ToDateTime(_xmlinvHdr.DODt).ToString("yyyy-MM-dd") + "</cbc:ActualDeliveryDate>");
        //                _builder.AppendLine("<cac:DeliveryLocation>");
        //                _builder.AppendLine("<cbc:ID schemeID = '0035'>" + _xmlinvHdr.CustomerNo + "</cbc:ID>");
        //                _builder.AppendLine("<cac:Address>");
        //                _builder.AppendLine("<cbc:StreetName>" + _xmlinvHdr.Address1 + "</cbc:StreetName>");
        //                _builder.AppendLine("<cbc:AdditionalStreetName>" + _xmlinvHdr.Address2 + "</cbc:AdditionalStreetName>");
        //                _builder.AppendLine("<cbc:CityName>" + _xmlinvHdr.City + "</cbc:CityName>");
        //                _builder.AppendLine("<cbc:PostalZone>" + _xmlinvHdr.PinCode + "</cbc:PostalZone>");
        //                _builder.AppendLine("<cbc:CountrySubentity>" + _xmlinvHdr.CountryCode + "</cbc:CountrySubentity>");
        //                _builder.AppendLine("<cac:AddressLine>");
        //                _builder.AppendLine("<cbc:Line>Delivery department</cbc:Line>");
        //                _builder.AppendLine("</cac:AddressLine>");
        //                _builder.AppendLine("<cac:Country>");
        //                _builder.AppendLine("<cbc:IdentificationCode>SG</cbc:IdentificationCode>");
        //                _builder.AppendLine("</cac:Country>");
        //                _builder.AppendLine("</cac:Address>");
        //                _builder.AppendLine("</cac:DeliveryLocation>");
        //                _builder.AppendLine("<cac:DeliveryParty>");
        //                _builder.AppendLine("<cac:PartyName>");
        //                _builder.AppendLine("<cbc:Name></cbc:Name>");
        //                _builder.AppendLine("</cac:PartyName>");
        //                _builder.AppendLine("</cac:DeliveryParty>");
        //                _builder.AppendLine("</cac:Delivery>");
        //                _builder.AppendLine("<cac:PaymentTerms>");
        //                _builder.AppendLine("<cbc:Note>" + _xmlinvHdr.PaymentTerms + "</cbc:Note>");
        //                _builder.AppendLine("</cac:PaymentTerms>");
        //                _builder.AppendLine("<cac:TaxTotal>");
        //                _builder.AppendLine("<cbc:TaxAmount currencyID='SGD'>" + _xmlinvHdr.GSTAmount + "</cbc:TaxAmount>");
        //                _builder.AppendLine("<cac:TaxSubtotal>");
        //                _builder.AppendLine("<cbc:TaxableAmount currencyID='SGD'>" + _xmlinvHdr.SubTotal + "</cbc:TaxableAmount>");
        //                _builder.AppendLine("<cbc:TaxAmount currencyID='SGD'>" + _xmlinvHdr.GSTAmount + "</cbc:TaxAmount>");
        //                _builder.AppendLine("<cac:TaxCategory>");
        //                _builder.AppendLine("<cbc:ID>SR</cbc:ID>");
        //                _builder.AppendLine("<cbc:Percent>" + _supplier.GST + "</cbc:Percent>");
        //                _builder.AppendLine("<cac:TaxScheme>");
        //                _builder.AppendLine("<cbc:ID>GST</cbc:ID>");
        //                _builder.AppendLine("</cac:TaxScheme>");
        //                _builder.AppendLine("</cac:TaxCategory>");
        //                _builder.AppendLine("</cac:TaxSubtotal>");
        //                _builder.AppendLine("</cac:TaxTotal>");
        //                _builder.AppendLine("<cac:LegalMonetaryTotal>");
        //                _builder.AppendLine("<cbc:LineExtensionAmount currencyID='SGD'>" + _xmlinvHdr.SubTotal + "</cbc:LineExtensionAmount>");
        //                _builder.AppendLine("<cbc:TaxExclusiveAmount currencyID='SGD'>" + _xmlinvHdr.SubTotal + "</cbc:TaxExclusiveAmount>");
        //                _builder.AppendLine("<cbc:TaxInclusiveAmount currencyID='SGD'>" + _xmlinvHdr.TotalAmount + "</cbc:TaxInclusiveAmount>");
        //                _builder.AppendLine("<cbc:AllowanceTotalAmount currencyID='SGD'>" + _xmlinvHdr.Discount + "</cbc:AllowanceTotalAmount>");
        //                _builder.AppendLine("<cbc:ChargeTotalAmount currencyID='SGD'>0.00</cbc:ChargeTotalAmount>");
        //                _builder.AppendLine("<cbc:PrepaidAmount currencyID='SGD'>0.00</cbc:PrepaidAmount>");
        //                _builder.AppendLine("<cbc:PayableRoundingAmount currencyID='SGD'>0.0</cbc:PayableRoundingAmount>");
        //                _builder.AppendLine("<cbc:PayableAmount currencyID='SGD'>" + _xmlinvHdr.TotalAmount + "</cbc:PayableAmount>");
        //                _builder.AppendLine("</cac:LegalMonetaryTotal >");

        //                foreach (var _xmlgrnLine in _xmlinvHdr.InvItems)
        //                {
        //                    _builder.AppendLine("<cac:InvoiceLine>");
        //                    _builder.AppendLine("<cbc:ID>" + _xmlgrnLine.ItemNo + "</cbc:ID>");
        //                    _builder.AppendLine("<cbc:InvoicedQuantity unitCode='H87'>" + _xmlgrnLine.Qty + "</cbc:InvoicedQuantity>");
        //                    _builder.AppendLine("<cbc:LineExtensionAmount currencyID='SGD'>" + _xmlgrnLine.SubAmt + "</cbc:LineExtensionAmount>");
        //                    _builder.AppendLine("<cbc:AccountingCost> Cost id 654</cbc:AccountingCost>");
        //                    _builder.AppendLine("<cac:InvoicePeriod>");
        //                    _builder.AppendLine("<cbc:StartDate>" + _xmlinvHdr.InvDt.ToString("yyyy-MM-dd") + "</cbc:StartDate>");
        //                    _builder.AppendLine("<cbc:EndDate>" + _xmlinvHdr.InvDt.ToString("yyyy-MM-dd") + "</cbc:EndDate>");
        //                    _builder.AppendLine("</cac:InvoicePeriod>");
        //                    _builder.AppendLine("<cac:OrderLineReference>");
        //                    _builder.AppendLine("<cbc:LineID>" + _xmlgrnLine.LineNo + "</cbc:LineID>");
        //                    _builder.AppendLine("</cac:OrderLineReference>");
        //                    _builder.AppendLine("<cac:DocumentReference>");
        //                    _builder.AppendLine("<cbc:ID schemeID='ABZ'>AB-123</cbc:ID>");
        //                    _builder.AppendLine("<cbc:DocumentTypeCode>130</cbc:DocumentTypeCode>");
        //                    _builder.AppendLine("</cac:DocumentReference>");
        //                    _builder.AppendLine("<cac:AllowanceCharge>");
        //                    _builder.AppendLine("<cbc:ChargeIndicator>false</cbc:ChargeIndicator>");
        //                    _builder.AppendLine("<cbc:AllowanceChargeReasonCode>100</cbc:AllowanceChargeReasonCode>");
        //                    _builder.AppendLine("<cbc:AllowanceChargeReason>Line discount</cbc:AllowanceChargeReason>");
        //                    _builder.AppendLine("<cbc:MultiplierFactorNumeric>" + _xmlgrnLine.DisPer + "</cbc:MultiplierFactorNumeric>");
        //                    _builder.AppendLine("<cbc:Amount currencyID='SGD'>" + _xmlgrnLine.Discount + "</cbc:Amount>");
        //                    _builder.AppendLine("<cbc:BaseAmount currencyID='SGD'>" + Math.Round((_xmlgrnLine.Qty * _xmlgrnLine.Price), 2) + "</cbc:BaseAmount>");
        //                    _builder.AppendLine("</cac:AllowanceCharge>");
        //                    _builder.AppendLine("<cac:Item>");
        //                    _builder.AppendLine("<cbc:Name>" + _xmlgrnLine.ItemName + "</cbc:Name>");
        //                    _builder.AppendLine("<cac:SellersItemIdentification>");
        //                    _builder.AppendLine("<cbc:ID>" + _xmlgrnLine.ItemNo + "</cbc:ID>");
        //                    _builder.AppendLine("</cac:SellersItemIdentification>");
        //                    _builder.AppendLine("<cac:StandardItemIdentification>");
        //                    _builder.AppendLine("<cbc:ID schemeID = '0160'>" + _xmlgrnLine.ItemNo + "</cbc:ID>");
        //                    _builder.AppendLine("</cac:StandardItemIdentification>");
        //                    _builder.AppendLine("<cac:OriginCountry>");
        //                    _builder.AppendLine("<cbc:IdentificationCode>CH</cbc:IdentificationCode>");
        //                    _builder.AppendLine("</cac:OriginCountry>");
        //                    _builder.AppendLine("<cac:CommodityClassification>");
        //                    _builder.AppendLine("<cbc:ItemClassificationCode listID='MP'>43211503</cbc:ItemClassificationCode>");
        //                    _builder.AppendLine("</cac:CommodityClassification>");
        //                    _builder.AppendLine("<cac:ClassifiedTaxCategory>");
        //                    _builder.AppendLine("<cbc:ID>SR</cbc:ID>");
        //                    _builder.AppendLine("<cbc:Percent>" + _supplier.GST + "</cbc:Percent>");
        //                    _builder.AppendLine("<cac:TaxScheme>");
        //                    _builder.AppendLine("<cbc:ID>GST</cbc:ID>");
        //                    _builder.AppendLine("</cac:TaxScheme>");
        //                    _builder.AppendLine("</cac:ClassifiedTaxCategory>");
        //                    _builder.AppendLine("</cac:Item>");
        //                    _builder.AppendLine("<cac:Price>");
        //                    _builder.AppendLine("<cbc:PriceAmount currencyID='SGD'>" + _xmlgrnLine.Price + "</cbc:PriceAmount>");
        //                    _builder.AppendLine("<cbc:BaseQuantity unitCode='H87'>1</cbc:BaseQuantity>");
        //                    _builder.AppendLine("</cac:Price>");
        //                    _builder.AppendLine("</cac:InvoiceLine>");
        //                }
        //                _builder.AppendLine("</Invoice>");
        //                _builder.AppendLine("</StandardBusinessDocument>");

        //                string path = _path + _xmlinvHdr.InvNo + "_" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xml";
        //                XmlDocument doc = new XmlDocument();

        //                doc.LoadXml(_builder.ToString());

        //                doc.Save(path);

        //                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(baseAddress + pathURL);
        //                request.ContentType = "text/xml; charset=utf-8";
        //                //request.Headers.Add("api_key", "t_27gA2xSjyFLM2ST68L6bARzIZk4peaN6");
        //                request.Headers.Add("api_key", "k_37and7AifVoKvkTeLfG3njOExW8JvAyb");
        //                request.Method = "POST";
        //                request.KeepAlive = true;
        //                StreamWriter _streamWriter = new StreamWriter(request.GetRequestStream(), Encoding.UTF8);
        //                doc.Save(_streamWriter);
        //                _streamWriter.Close();
        //                HttpWebResponse response;
        //                response = (HttpWebResponse)request.GetResponse();
        //                if (response.StatusCode == HttpStatusCode.OK)
        //                {
        //                    Stream responseStream = response.GetResponseStream();
        //                    string responseStr = new StreamReader(responseStream).ReadToEnd();
        //                    Response _result = JsonConvert.DeserializeObject<Response>(responseStr);
        //                    _docid = _result.DocId;
        //                    _status = _result.Status;
        //                    ClsCommon.ExecuteSqlAnother("Insert into PeppolLog (LogDate,InvoiceNo, DocumentNo , FunctionName, Status, Exception) values (GetDate()," + ClsCommon.SafeSql(_invHdr.InvNo) + "," + ClsCommon.SafeSql(_docid) + ",'ExportInvoice'," + ClsCommon.SafeSql(responseStr) + "," + ClsCommon.SafeSql("") + ")");
        //                    ClsCommon.ExecuteSqlAnother("Update Invoice set PeppolDocId = " + ClsCommon.SafeSql(_docid) + ", PeppolStatus = " + ClsCommon.SafeSql(_status) + " where InvNo = " + ClsCommon.SafeSql(_invHdr.InvNo));
        //                }
        //            }

        //            return "Success";
        //        }
        //        catch (Exception ex)
        //        {
        //            ClsCommon.ExecuteSqlAnother("Insert into PeppolLog (LogDate,InvoiceNo, DocumentNo , FunctionName, Status, Exception) values (GetDate()," + ClsCommon.SafeSql(_invHdr.InvNo) + "," + ClsCommon.SafeSql(_docid) + ",'ExportInvoice'," + ClsCommon.SafeSql(_status) + "," + ClsCommon.SafeSql(ex.Message) + ")");
        //            ClsCommon.ExecuteSqlAnother("Insert into Exception (DocDate, DTG , DocType, ColType, Remarks) values (GetDate(),GetDate(),'ExportInvoice','InvnGet'," + ClsCommon.SafeSql(ex.Message) + ")");
        //            return ex.Message.ToString();
        //        }
        //    }
        //    {
        //        return null;
        //    }
        //}
        //public static string UpdateOutboundStatus(string _invno)
        //{
        //    string _status = string.Empty;
        //    string _docid = string.Empty;
        //    try
        //    {
        //        SqlDataReader dtr;
        //        dtr = ClsCommon.ReadRecord("Select PeppolDocId from Invoice where invno = " + ClsCommon.SafeSql(_invno));
        //        if (dtr.Read())
        //        {
        //            _docid = dtr["PeppolDocId"].ToString();
        //        }
        //        dtr.Close();
        //        string JsonData = string.Empty;
        //        JsonData = "docIds=" + _docid;
        //        //string baseAddress = "https://api.ap-connect.dev.einvoice.sg";
        //        string baseAddress = "https://api.ap-connect.einvoice.sg/";
        //        string pathURL = "/v1/invoice/outbound/status/?" + JsonData;

        //        HttpWebRequest request = (HttpWebRequest)WebRequest.Create(baseAddress + pathURL);
        //        request.ContentType = "text/xml; charset=utf-8";
        //        //request.Headers.Add("api_key", "t_27gA2xSjyFLM2ST68L6bARzIZk4peaN6");
        //        request.Headers.Add("api_key", "k_37and7AifVoKvkTeLfG3njOExW8JvAyb");
        //        request.Method = "GET";
        //        request.KeepAlive = true;
        //        HttpWebResponse response;
        //        response = (HttpWebResponse)request.GetResponse();
        //        if (response.StatusCode == HttpStatusCode.OK)
        //        {
        //            Stream responseStream = response.GetResponseStream();
        //            string responseStr = new StreamReader(responseStream).ReadToEnd();
        //            Response[] _result = JsonConvert.DeserializeObject<Response[]>(responseStr);
        //            _docid = _result[0].DocId;
        //            _status = string.IsNullOrEmpty(_result[0].Status) ? _result[0].Message : _result[0].Status;
        //            ClsCommon.ExecuteSqlAnother("Insert into PeppolLog (LogDate,InvoiceNo, DocumentNo , FunctionName, Status, Exception) values (GetDate()," + ClsCommon.SafeSql(_invno) + "," + ClsCommon.SafeSql(_docid) + ",'ExportInvoice'," + ClsCommon.SafeSql(responseStr) + "," + ClsCommon.SafeSql("") + ")");
        //            ClsCommon.ExecuteSqlAnother("Update Invoice set PeppolDocId = " + ClsCommon.SafeSql(_docid) + ", PeppolStatus = " + ClsCommon.SafeSql(_status) + " where InvNo = " + ClsCommon.SafeSql(_invno));
        //        }
        //        return "Success";
        //    }
        //    catch (Exception ex)
        //    {
        //        return ex.Message.ToString();
        //    }
        //}
        public static string Inbound(string _path)
        {
            string _invoiceFileUrl = string.Empty;
            string _evidenceFileUrl = string.Empty;
            string _expiredAt = string.Empty;
            string _receivedAt = string.Empty;
            string _docid = string.Empty;
            try
            {
                string JsonData = string.Empty;
                JsonData = "docIds=" + _docid;
                //string baseAddress = "https://api.ap-connect.dev.einvoice.sg/";
                string baseAddress = "https://api.ap-connect.einvoice.sg/";

                string pathURL = "v1/invoice/inbound";
                int j = 0;
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(baseAddress + pathURL);
                request.ContentType = "text/xml; charset=utf-8";
                //request.Headers.Add("api_key", "t_27gA2xSjyFLM2ST68L6bARzIZk4peaN6");
                request.Headers.Add("api_key", "k_37and7AifVoKvkTeLfG3njOExW8JvAyb");
                request.Method = "GET";
                request.KeepAlive = true;
                HttpWebResponse response;
                response = (HttpWebResponse)request.GetResponse();
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    Stream responseStream = response.GetResponseStream();
                    string responseStr = new StreamReader(responseStream).ReadToEnd();
                    InboundResponse[] _result = JsonConvert.DeserializeObject<InboundResponse[]>(responseStr);
                    if (_result.Count<InboundResponse>() <= 0)
                    {
                        return "No inbound invoice found.";
                    }
                    //for (j = 0; j <= _result.Count<InboundResponse>() - 1; j++)
                    //{
                    //    _docid = _result[j].DocId;
                    //    _receivedAt = _result[j].ReceivedAt;
                    //    _invoiceFileUrl = _result[j].InvoiceFileURL;
                    //    _evidenceFileUrl = _result[j].EvidenceFileUrl;
                    //    _expiredAt = _result[j].ExpiresAt;
                    //    HttpWebRequest _invfilerequest = (HttpWebRequest)WebRequest.Create(_invoiceFileUrl);
                    //    _invfilerequest.Method = "GET";
                    //    _invfilerequest.KeepAlive = true;
                    //    HttpWebResponse _invfileresponse;
                    //    _invfileresponse = (HttpWebResponse)_invfilerequest.GetResponse();
                    //    if (_invfileresponse.StatusCode == HttpStatusCode.OK)
                    //    {
                    //        Stream _invfileresponseStream = _invfileresponse.GetResponseStream();
                    //        string _invfileresponseStr = new StreamReader(_invfileresponseStream).ReadToEnd();
                    //        string path = _path + _docid + "_" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xml";

                    //        XmlDocument doc = new XmlDocument();

                    //        doc.LoadXml(_invfileresponseStr.ToString());

                    //        doc.Save(path);

                    //        string invno = string.Empty;
                    //        ReceivedInvoiceHdr _rechdr = new ReceivedInvoiceHdr();

                    //        string _invno = string.Empty;
                    //        XmlDocument xmldoc = new XmlDocument();
                    //        XmlNodeList xmlnode;
                    //        int i = 0;
                    //        //string str = null;
                    //        FileStream fs = new FileStream(path, FileMode.Open, FileAccess.Read);
                    //        xmldoc.Load(fs);
                    //        xmlnode = xmldoc.GetElementsByTagName("StandardBusinessDocumentHeader");
                    //        for (i = 0; i <= xmlnode.Count - 1; i++)
                    //        {
                    //            _rechdr.SendorIdentifier = xmlnode[i].ChildNodes.Item(1).Name.Trim() == "Sender" ? xmlnode[i].ChildNodes.Item(1).InnerText.ToString() : string.Empty;
                    //            _rechdr.ReceivedIdentifier = xmlnode[i].ChildNodes.Item(2).Name.Trim() == "Receiver" ? xmlnode[i].ChildNodes.Item(2).InnerText.ToString() : string.Empty;
                    //            _rechdr.Type = xmlnode[i].ChildNodes.Item(3).Name.Trim() == "DocumentIdentification" ? xmlnode[i].ChildNodes.Item(3).ChildNodes.Item(3).InnerText.ToString() : string.Empty;
                    //            _rechdr.CreationDateAndTime = xmlnode[i].ChildNodes.Item(3).Name.Trim() == "DocumentIdentification" ? xmlnode[i].ChildNodes.Item(3).ChildNodes.Item(4).InnerText.ToString() : string.Empty;
                    //        }
                    //        xmlnode = xmldoc.GetElementsByTagName("Invoice");
                    //        for (i = 0; i <= xmlnode.Count - 1; i++)
                    //        {
                    //            _rechdr.InvoiceTypeCode = "380";
                    //            _rechdr.DocumentCurrencyCode = "SGD";
                    //            _invno = xmlnode[i].ChildNodes.Item(3).Name.Trim() == "cbc:ID" ? xmlnode[i].ChildNodes.Item(3).InnerText.ToString() : string.Empty;
                    //            _rechdr.InvoiceNo = xmlnode[i].ChildNodes.Item(3).Name.Trim() == "cbc:ID" ? xmlnode[i].ChildNodes.Item(3).InnerText.ToString() : string.Empty;
                    //            _rechdr.IssuedDate = xmlnode[i].ChildNodes.Item(4).Name.Trim() == "cbc:IssueDate" ? Convert.ToDateTime(xmlnode[i].ChildNodes.Item(4).InnerText.ToString()) : DateTime.Now;
                    //            _rechdr.DueDate = xmlnode[i].ChildNodes.Item(5).Name.Trim() == "cbc:DueDate" ? Convert.ToDateTime(xmlnode[i].ChildNodes.Item(5).InnerText.ToString()) : DateTime.Now;
                    //            _rechdr.DeliveryOrderNo = xmlnode[i].ChildNodes.Item(13).Name.Trim() == "cac:DespatchDocumentReference" ? xmlnode[i].ChildNodes.Item(13).InnerText.ToString() : string.Empty;

                    //            _rechdr.AccoundingCost = "102035";
                    //            _rechdr.BuyerReference = "123";
                    //            _rechdr.SalesOrderID = xmlnode[i].ChildNodes.Item(11).Name.Trim() == "cac:OrderReference" ? xmlnode[i].ChildNodes.Item(11).ChildNodes.Item(1).InnerText.ToString() : string.Empty;

                    //        }
                    //        xmlnode = xmldoc.GetElementsByTagName("cac:AccountingCustomerParty");
                    //        for (i = 0; i <= xmlnode.Count - 1; i++)
                    //        {
                    //            _rechdr.CustomerID = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cac:Party" ? xmlnode[i].ChildNodes.Item(0).ChildNodes.Item(0).InnerText.ToString() : string.Empty;
                    //            _rechdr.CustomerName = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cac:Party" ? xmlnode[i].ChildNodes.Item(0).ChildNodes.Item(2).ChildNodes.Item(0).InnerText.ToString() : string.Empty;
                    //            _rechdr.StreetName = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cac:Party" ? xmlnode[i].ChildNodes.Item(0).ChildNodes.Item(3).ChildNodes.Item(0).InnerText.ToString() : string.Empty;
                    //            _rechdr.CityName = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cac:Party" ? xmlnode[i].ChildNodes.Item(0).ChildNodes.Item(3).ChildNodes.Item(2).InnerText.ToString() : string.Empty;
                    //            _rechdr.PostalZone = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cac:Party" ? xmlnode[i].ChildNodes.Item(0).ChildNodes.Item(3).ChildNodes.Item(3).InnerText.ToString() : string.Empty;
                    //            _rechdr.CountryCode = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cac:Party" ? xmlnode[i].ChildNodes.Item(0).ChildNodes.Item(3).ChildNodes.Item(4).InnerText.ToString() : string.Empty;
                    //            _rechdr.ContactPerson = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cac:Party" ? xmlnode[i].ChildNodes.Item(0).ChildNodes.Item(5).ChildNodes.Item(0).InnerText.ToString() : string.Empty;
                    //            _rechdr.Email = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cac:Party" ? xmlnode[i].ChildNodes.Item(0).ChildNodes.Item(5).ChildNodes.Item(2).InnerText.ToString() : string.Empty;

                    //        }
                    //        xmlnode = xmldoc.GetElementsByTagName("cac:Delivery");
                    //        for (i = 0; i <= xmlnode.Count - 1; i++)
                    //        {
                    //            _rechdr.ActualDeliveryDate = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "ActualDeliveryDate" ? Convert.ToDateTime(xmlnode[i].ChildNodes.Item(0).InnerText) : DateTime.Now;
                    //            _rechdr.ShipAdd = xmlnode[i].ChildNodes.Item(1).Name.Trim() == "cac:DeliveryLocation" ? xmlnode[i].ChildNodes.Item(1).ChildNodes.Item(1).ChildNodes.Item(0).InnerText.ToString() : string.Empty;
                    //            _rechdr.ShipAdd2 = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cac:DeliveryLocation" ? xmlnode[i].ChildNodes.Item(1).ChildNodes.Item(1).ChildNodes.Item(1).InnerText.ToString() : string.Empty;
                    //            _rechdr.ShipCity = xmlnode[i].ChildNodes.Item(1).Name.Trim() == "cac:DeliveryLocation" ? xmlnode[i].ChildNodes.Item(1).ChildNodes.Item(1).ChildNodes.Item(2).InnerText.ToString() : string.Empty;
                    //            _rechdr.ShipPin = xmlnode[i].ChildNodes.Item(1).Name.Trim() == "cac:DeliveryLocation" ? xmlnode[i].ChildNodes.Item(1).ChildNodes.Item(1).ChildNodes.Item(3).InnerText.ToString() : string.Empty;

                    //        }
                    //        xmlnode = xmldoc.GetElementsByTagName("cac:PaymentTerms");
                    //        for (i = 0; i <= xmlnode.Count - 1; i++)
                    //        {
                    //            _rechdr.PaymentTerms = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cbc:Note" ? xmlnode[i].ChildNodes.Item(0).InnerText.ToString() : string.Empty;

                    //        }
                    //        xmlnode = xmldoc.GetElementsByTagName("cac:TaxTotal");
                    //        for (i = 0; i <= xmlnode.Count - 1; i++)
                    //        {
                    //            _rechdr.GstAmt = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cbc:TaxAmount" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(0).InnerText.ToString()) : 0;
                    //            _rechdr.TaxCategory = xmlnode[i].ChildNodes.Item(1).Name.Trim() == "cac:TaxSubtotal" ? xmlnode[i].ChildNodes.Item(1).ChildNodes.Item(2).ChildNodes.Item(0).InnerText.ToString() : string.Empty;
                    //            _rechdr.GstPercentage = xmlnode[i].ChildNodes.Item(1).Name.Trim() == "cac:TaxSubtotal" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(1).ChildNodes.Item(2).ChildNodes.Item(1).InnerText.ToString()) : 0;
                    //            _rechdr.TaxScheme = xmlnode[i].ChildNodes.Item(1).Name.Trim() == "cac:TaxSubtotal" ? xmlnode[i].ChildNodes.Item(1).ChildNodes.Item(2).ChildNodes.Item(2).ChildNodes.Item(0).InnerText.ToString() : string.Empty;
                    //        }
                    //        xmlnode = xmldoc.GetElementsByTagName("cac:LegalMonetaryTotal");
                    //        for (i = 0; i <= xmlnode.Count - 1; i++)
                    //        {
                    //            _rechdr.SubTotal = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cbc:LineExtensionAmount" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(0).InnerText.ToString()) : 0;
                    //            _rechdr.Discount = xmlnode[i].ChildNodes.Item(3).Name.Trim() == "cbc:AllowanceTotalAmount" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(3).InnerText.ToString()) : 0;
                    //            _rechdr.TotalAmount = xmlnode[i].ChildNodes.Item(2).Name.Trim() == "cbc:TaxInclusiveAmount" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(2).InnerText.ToString()) : 0;

                    //        }

                    //        IList<ReceivedInvoiceLine> _invitemlist = new List<ReceivedInvoiceLine>();

                    //        xmlnode = xmldoc.GetElementsByTagName("cac:InvoiceLine");
                    //        for (i = 0; i <= xmlnode.Count - 1; i++)
                    //        {
                    //            ReceivedInvoiceLine _recinvline = new ReceivedInvoiceLine();
                    //            _recinvline.InvoiceNo = _invno;
                    //            _recinvline.ItemNo = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cbc:ID" ? xmlnode[i].ChildNodes.Item(0).InnerText.ToString() : string.Empty;
                    //            _recinvline.ItemName = xmlnode[i].ChildNodes.Item(8).Name.Trim() == "cac:Item" ? xmlnode[i].ChildNodes.Item(8).ChildNodes.Item(0).InnerText.ToString() : string.Empty;
                    //            _recinvline.UOM = xmlnode[i].ChildNodes.Item(1).Name.Trim() == "cbc:InvoicedQuantity" ? xmlnode[i].ChildNodes.Item(1).Attributes.Item(0).Value.ToString() : string.Empty;
                    //            _recinvline.Qty = xmlnode[i].ChildNodes.Item(1).Name.Trim() == "cbc:InvoicedQuantity" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(1).InnerText.ToString()) : 0;
                    //            _recinvline.Price = xmlnode[i].ChildNodes.Item(9).Name.Trim() == "cac:Price" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(9).ChildNodes.Item(0).InnerText.ToString()) : 0;
                    //            _recinvline.DiscountPercentage = xmlnode[i].ChildNodes.Item(7).Name.Trim() == "cac:AllowanceCharge" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(7).ChildNodes.Item(3).InnerText.ToString()) : 0;
                    //            _recinvline.DiscountAmount = xmlnode[i].ChildNodes.Item(7).Name.Trim() == "cac:AllowanceCharge" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(7).ChildNodes.Item(4).InnerText.ToString()) : 0;
                    //            _recinvline.SubAmount = xmlnode[i].ChildNodes.Item(2).Name.Trim() == "cbc:LineExtensionAmount" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(2).InnerText.ToString()) : 0;
                    //            _recinvline.LineNo = xmlnode[i].ChildNodes.Item(5).Name.Trim() == "cac:OrderLineReference" ? Convert.ToInt32(xmlnode[i].ChildNodes.Item(5).ChildNodes.Item(0).InnerText.ToString()) : 0;

                    //            _invitemlist.Add(_recinvline);

                    //        }
                    //        _rechdr.ReceivedInvoiceLines = _invitemlist;

                    //        ClsCommon.ExecuteSqlAnother("Insert into ReceivedInvoice (PeppolDocId, SendorIdentifier, ReceiverIdentifier, Type, CreationDateAndTime, InvoiceTypeCode, CurCode, InvNo, InvDt, DueDate, AccountingCost, BuyerRef, OrdNo, CustId, CustomerName, StreetName, CityName, PostalZone, CountryCode, ContactPerson, Email, DoDt, ShipAdd, ShipAdd2, ShipCity, ShipPin, PayTerms, GstAmt, TaxCategory, DoNo, GstPercentage, TaxScheme, SubTotal, Discount, TotalAmt) values (" +
                    //            ClsCommon.SafeSql(_docid) + "," + ClsCommon.SafeSql(_rechdr.SendorIdentifier) + "," + ClsCommon.SafeSql(_rechdr.ReceivedIdentifier) + "," + ClsCommon.SafeSql(_rechdr.Type) + "," + ClsCommon.SafeSql(_rechdr.CreationDateAndTime) + "," + ClsCommon.SafeSql(_rechdr.InvoiceTypeCode) + "," + ClsCommon.SafeSql(_rechdr.DocumentCurrencyCode) + "," + ClsCommon.SafeSql(_rechdr.InvoiceNo) + "," + ClsCommon.SafeSql(Convert.ToDateTime(_rechdr.IssuedDate).ToString("yyyy-MM-dd HH:mm:ss")) + "," + ClsCommon.SafeSql(Convert.ToDateTime(_rechdr.DueDate).ToString("yyyy-MM-dd HH:mm:ss")) + "," +
                    //            ClsCommon.SafeSql(_rechdr.AccoundingCost) + "," + ClsCommon.SafeSql(_rechdr.BuyerReference) + "," + ClsCommon.SafeSql(_rechdr.SalesOrderID) + "," + ClsCommon.SafeSql(_rechdr.CustomerID) + "," + ClsCommon.SafeSql(_rechdr.CustomerName) + "," + ClsCommon.SafeSql(_rechdr.StreetName) + "," + ClsCommon.SafeSql(_rechdr.CityName) + "," + ClsCommon.SafeSql(_rechdr.PostalZone) + "," + ClsCommon.SafeSql(_rechdr.CountryCode) + "," + ClsCommon.SafeSql(_rechdr.ContactPerson) + "," + ClsCommon.SafeSql(_rechdr.Email) + "," + ClsCommon.SafeSql(Convert.ToDateTime(_rechdr.ActualDeliveryDate).ToString("yyyy-MM-dd HH:mm:ss")) + "," + ClsCommon.SafeSql(_rechdr.ShipAdd) + "," +
                    //            ClsCommon.SafeSql(_rechdr.ShipAdd2) + "," + ClsCommon.SafeSql(_rechdr.ShipCity) + "," + ClsCommon.SafeSql(_rechdr.ShipPin) + "," + ClsCommon.SafeSql(_rechdr.PaymentTerms) + "," + _rechdr.GstAmt + "," + ClsCommon.SafeSql(_rechdr.TaxCategory) + "," + ClsCommon.SafeSql(_rechdr.DeliveryOrderNo) + "," + _rechdr.GstPercentage + "," + ClsCommon.SafeSql(_rechdr.TaxScheme) + "," + _rechdr.SubTotal + "," + _rechdr.Discount + "," + _rechdr.TotalAmount + ")");

                    //        foreach (ReceivedInvoiceLine _recLine in _rechdr.ReceivedInvoiceLines)
                    //        {

                    //            ClsCommon.ExecuteSqlAnother("Insert into ReceivedInvItem (InvNo, ItemNo, Description, [LineNo], UOM, UOM1, Qty, Price, DisPer, Discount, SubAmt, Remarks ) Values (" + ClsCommon.SafeSql(_invno) + "," + ClsCommon.SafeSql(_recLine.ItemNo) + "," + ClsCommon.SafeSql(_recLine.ItemName) + "," + _recLine.LineNo + "," + ClsCommon.SafeSql(_recLine.UOM) + ",(Select UOM from InvItem where invno = " + ClsCommon.SafeSql(_invno) + " and [LineNo] = " + _recLine.LineNo + " ), " + _recLine.Qty + "," + _recLine.Price + "," + _recLine.DiscountPercentage + "," + _recLine.DiscountAmount + "," + _recLine.SubAmount + "," + ClsCommon.SafeSql("") + ")");
                    //        }
                    //    }
                    //    ClsCommon.ExecuteSqlAnother("Insert into PeppolLog (LogDate,InvoiceNo, DocumentNo , FunctionName, Status, Exception) values (GetDate()," + ClsCommon.SafeSql("") + "," + ClsCommon.SafeSql(_docid) + ",'InboundInvoice'," + ClsCommon.SafeSql(responseStr) + "," + ClsCommon.SafeSql("") + ")");
                    //}

                    //ClsCommon.ExecuteSqlAnother("Update Invoice set PeppolDocId = " + ClsCommon.SafeSql(_docid) + ", PeppolStatus = " + ClsCommon.SafeSql("") + " where InvNo = " + ClsCommon.SafeSql(""));
                }
                return "Success";
            }
            catch (Exception ex)
            {
                ClsCommon.ExecuteSqlAnother("Insert into PeppolLog (LogDate,InvoiceNo, DocumentNo , FunctionName, Status, Exception) values (GetDate()," + ClsCommon.SafeSql("") + "," + ClsCommon.SafeSql(_docid) + ",'InboundInvoice'," + ClsCommon.SafeSql("") + "," + ClsCommon.SafeSql(ex.Message.ToString()) + ")");
                return ex.Message.ToString();
            }
        }
        //public static string InboundStatic(string _path)
        //{
        //    string _invoiceFileUrl = string.Empty;
        //    string _evidenceFileUrl = string.Empty;
        //    string _expiredAt = string.Empty;
        //    string _receivedAt = string.Empty;
        //    string _docid = string.Empty;
        //    try
        //    {
        //        XmlDocument doc = new XmlDocument();
        //        _path = "D:\\Peppol\\E-Invoice - Peppol\\E-Invoice - Peppol\\E-Invoice\\SimplrXMLSFTP\\SimplrXMLSFTP\\bin\\Debug\\Exportcbc52555-6c07-44e2-8b21-17a8f10934ad_24092021125314.xml";
        //        // _path = "C:\\Users\\Dell\\Downloads\\E-Invoice13.09.2021\\E-Invoice\\SimplrXMLSFTP\\SimplrXMLSFTP\\bin\\Debug\\Exportcbc52555-6c07-44e2-8b21-17a8f10934ad_24092021125314.xml";
        //        //string str = null;
        //        FileStream fs = new FileStream(_path, FileMode.Open, FileAccess.Read);
        //        string invno = string.Empty;
        //        ReceivedInvoiceHdr _rechdr = new ReceivedInvoiceHdr();
        //        string responseStr = "";
        //        string _invno = string.Empty;
        //        XmlDocument xmldoc = new XmlDocument();
        //        XmlNodeList xmlnode;
        //        int i = 0;
        //        xmldoc.Load(fs);
        //        xmlnode = xmldoc.GetElementsByTagName("StandardBusinessDocumentHeader");
        //        for (i = 0; i <= xmlnode.Count - 1; i++)
        //        {
        //            _rechdr.SendorIdentifier = xmlnode[i].ChildNodes.Item(1).Name.Trim() == "Sender" ? xmlnode[i].ChildNodes.Item(1).InnerText.ToString() : string.Empty;
        //            _rechdr.ReceivedIdentifier = xmlnode[i].ChildNodes.Item(2).Name.Trim() == "Receiver" ? xmlnode[i].ChildNodes.Item(2).InnerText.ToString() : string.Empty;
        //            _rechdr.Type = xmlnode[i].ChildNodes.Item(3).Name.Trim() == "DocumentIdentification" ? xmlnode[i].ChildNodes.Item(3).ChildNodes.Item(3).InnerText.ToString() : string.Empty;
        //            _rechdr.CreationDateAndTime = xmlnode[i].ChildNodes.Item(3).Name.Trim() == "DocumentIdentification" ? xmlnode[i].ChildNodes.Item(3).ChildNodes.Item(4).InnerText.ToString() : string.Empty;
        //        }
        //        xmlnode = xmldoc.GetElementsByTagName("Invoice");
        //        for (i = 0; i <= xmlnode.Count - 1; i++)
        //        {
        //            _rechdr.InvoiceTypeCode = "380";
        //            _rechdr.DocumentCurrencyCode = "SGD";
        //            _invno = xmlnode[i].ChildNodes.Item(3).Name.Trim() == "cbc:ID" ? xmlnode[i].ChildNodes.Item(3).InnerText.ToString() : string.Empty;
        //            _rechdr.InvoiceNo = xmlnode[i].ChildNodes.Item(3).Name.Trim() == "cbc:ID" ? xmlnode[i].ChildNodes.Item(3).InnerText.ToString() : string.Empty;
        //            _rechdr.IssuedDate = xmlnode[i].ChildNodes.Item(4).Name.Trim() == "cbc:IssueDate" ? Convert.ToDateTime(xmlnode[i].ChildNodes.Item(4).InnerText.ToString()) : DateTime.Now;
        //            _rechdr.DueDate = xmlnode[i].ChildNodes.Item(5).Name.Trim() == "cbc:DueDate" ? Convert.ToDateTime(xmlnode[i].ChildNodes.Item(5).InnerText.ToString()) : DateTime.Now;
        //            _rechdr.DeliveryOrderNo = xmlnode[i].ChildNodes.Item(13).Name.Trim() == "cac:DespatchDocumentReference" ? xmlnode[i].ChildNodes.Item(13).InnerText.ToString() : string.Empty;

        //            _rechdr.AccoundingCost = "102035";
        //            _rechdr.BuyerReference = "123";
        //            _rechdr.SalesOrderID = xmlnode[i].ChildNodes.Item(11).Name.Trim() == "cac:OrderReference" ? xmlnode[i].ChildNodes.Item(11).ChildNodes.Item(1).InnerText.ToString() : string.Empty;

        //        }
        //        xmlnode = xmldoc.GetElementsByTagName("cac:AccountingCustomerParty");
        //        for (i = 0; i <= xmlnode.Count - 1; i++)
        //        {
        //            _rechdr.CustomerID = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cac:Party" ? xmlnode[i].ChildNodes.Item(0).ChildNodes.Item(0).InnerText.ToString() : string.Empty;
        //            _rechdr.CustomerName = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cac:Party" ? xmlnode[i].ChildNodes.Item(0).ChildNodes.Item(1).ChildNodes.Item(0).InnerText.ToString() : string.Empty;
        //            _rechdr.StreetName = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cac:Party" ? xmlnode[i].ChildNodes.Item(0).ChildNodes.Item(2).ChildNodes.Item(0).InnerText.ToString() : string.Empty;
        //            //_rechdr.CityName = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cac:Party" ? xmlnode[i].ChildNodes.Item(0).ChildNodes.Item(3).ChildNodes.Item(2).InnerText.ToString() : string.Empty;
        //            _rechdr.CityName = "";
        //            //_rechdr.PostalZone = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cac:Party" ? xmlnode[i].ChildNodes.Item(0).ChildNodes.Item(3).ChildNodes.Item(3).InnerText.ToString() : string.Empty;
        //            _rechdr.PostalZone = "";
        //            //_rechdr.CountryCode = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cac:Party" ? xmlnode[i].ChildNodes.Item(0).ChildNodes.Item(3).ChildNodes.Item(4).InnerText.ToString() : string.Empty;
        //            _rechdr.CountryCode = "";
        //            // _rechdr.ContactPerson = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cac:Party" ? xmlnode[i].ChildNodes.Item(0).ChildNodes.Item(5).ChildNodes.Item(0).InnerText.ToString() : string.Empty;
        //            _rechdr.ContactPerson = "";
        //            //_rechdr.Email = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cac:Party" ? xmlnode[i].ChildNodes.Item(0).ChildNodes.Item(5).ChildNodes.Item(2).InnerText.ToString() : string.Empty;
        //            _rechdr.Email = "";

        //        }
        //        xmlnode = xmldoc.GetElementsByTagName("cac:Delivery");
        //        for (i = 0; i <= xmlnode.Count - 1; i++)
        //        {
        //            _rechdr.ActualDeliveryDate = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "ActualDeliveryDate" ? Convert.ToDateTime(xmlnode[i].ChildNodes.Item(0).InnerText) : DateTime.Now;
        //            _rechdr.ShipAdd = xmlnode[i].ChildNodes.Item(1).Name.Trim() == "cac:DeliveryLocation" ? xmlnode[i].ChildNodes.Item(1).ChildNodes.Item(1).ChildNodes.Item(0).InnerText.ToString() : string.Empty;
        //            _rechdr.ShipAdd2 = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cac:DeliveryLocation" ? xmlnode[i].ChildNodes.Item(1).ChildNodes.Item(1).ChildNodes.Item(1).InnerText.ToString() : string.Empty;
        //            _rechdr.ShipCity = xmlnode[i].ChildNodes.Item(1).Name.Trim() == "cac:DeliveryLocation" ? xmlnode[i].ChildNodes.Item(1).ChildNodes.Item(1).ChildNodes.Item(2).InnerText.ToString() : string.Empty;
        //            _rechdr.ShipPin = xmlnode[i].ChildNodes.Item(1).Name.Trim() == "cac:DeliveryLocation" ? xmlnode[i].ChildNodes.Item(1).ChildNodes.Item(1).ChildNodes.Item(3).InnerText.ToString() : string.Empty;

        //        }
        //        if (_rechdr.ShipAdd2 == null)
        //            _rechdr.ShipAdd2 = "";
        //        if (_rechdr.ShipAdd == null)
        //            _rechdr.ShipAdd = "";
        //        if (_rechdr.ShipCity == null)
        //            _rechdr.ShipCity = "";
        //        if (_rechdr.ShipPin == null)
        //            _rechdr.ShipPin = "";
        //        if (_rechdr.ActualDeliveryDate == null)
        //            _rechdr.ActualDeliveryDate = _rechdr.DueDate;


        //        xmlnode = xmldoc.GetElementsByTagName("cac:PaymentTerms");
        //        for (i = 0; i <= xmlnode.Count - 1; i++)
        //        {
        //            _rechdr.PaymentTerms = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cbc:Note" ? xmlnode[i].ChildNodes.Item(0).InnerText.ToString() : string.Empty;

        //        }
        //        xmlnode = xmldoc.GetElementsByTagName("cac:TaxTotal");
        //        for (i = 0; i <= xmlnode.Count - 1; i++)
        //        {
        //            _rechdr.GstAmt = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cbc:TaxAmount" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(0).InnerText.ToString()) : 0;
        //            _rechdr.TaxCategory = xmlnode[i].ChildNodes.Item(1).Name.Trim() == "cac:TaxSubtotal" ? xmlnode[i].ChildNodes.Item(1).ChildNodes.Item(2).ChildNodes.Item(0).InnerText.ToString() : string.Empty;
        //            _rechdr.GstPercentage = xmlnode[i].ChildNodes.Item(1).Name.Trim() == "cac:TaxSubtotal" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(1).ChildNodes.Item(2).ChildNodes.Item(1).InnerText.ToString()) : 0;
        //            _rechdr.TaxScheme = xmlnode[i].ChildNodes.Item(1).Name.Trim() == "cac:TaxSubtotal" ? xmlnode[i].ChildNodes.Item(1).ChildNodes.Item(2).ChildNodes.Item(2).ChildNodes.Item(0).InnerText.ToString() : string.Empty;
        //        }
        //        xmlnode = xmldoc.GetElementsByTagName("cac:LegalMonetaryTotal");
        //        for (i = 0; i <= xmlnode.Count - 1; i++)
        //        {
        //            _rechdr.SubTotal = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cbc:LineExtensionAmount" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(0).InnerText.ToString()) : 0;
        //            _rechdr.Discount = xmlnode[i].ChildNodes.Item(3).Name.Trim() == "cbc:AllowanceTotalAmount" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(3).InnerText.ToString()) : 0;
        //            _rechdr.TotalAmount = xmlnode[i].ChildNodes.Item(2).Name.Trim() == "cbc:TaxInclusiveAmount" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(2).InnerText.ToString()) : 0;

        //        }

        //        IList<ReceivedInvoiceLine> _invitemlist = new List<ReceivedInvoiceLine>();

        //        xmlnode = xmldoc.GetElementsByTagName("cac:InvoiceLine");
        //        for (i = 0; i <= xmlnode.Count - 1; i++)
        //        {
        //            ReceivedInvoiceLine _recinvline = new ReceivedInvoiceLine();
        //            _recinvline.InvoiceNo = _invno;
        //            _recinvline.ItemNo = xmlnode[i].ChildNodes.Item(0).Name.Trim() == "cbc:ID" ? xmlnode[i].ChildNodes.Item(0).InnerText.ToString() : string.Empty;
        //            //_recinvline.ItemName = xmlnode[i].ChildNodes.Item(8).Name.Trim() == "cac:Item" ? xmlnode[i].ChildNodes.Item(8).ChildNodes.Item(0).InnerText.ToString() : string.Empty;
        //            _recinvline.ItemName = xmlnode[i].ChildNodes.Item(3).Name.Trim() == "cac:Item" ? xmlnode[i].ChildNodes.Item(3).ChildNodes.Item(1).InnerText.ToString() : string.Empty;
        //            _recinvline.UOM = xmlnode[i].ChildNodes.Item(1).Name.Trim() == "cbc:InvoicedQuantity" ? xmlnode[i].ChildNodes.Item(1).Attributes.Item(0).Value.ToString() : string.Empty;
        //            _recinvline.Qty = xmlnode[i].ChildNodes.Item(1).Name.Trim() == "cbc:InvoicedQuantity" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(1).InnerText.ToString()) : 0;
        //            //_recinvline.Price = xmlnode[i].ChildNodes.Item(9).Name.Trim() == "cac:Price" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(9).ChildNodes.Item(0).InnerText.ToString()) : 0;
        //            _recinvline.Price = xmlnode[i].ChildNodes.Item(4).Name.Trim() == "cac:Price" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(4).ChildNodes.Item(0).InnerText.ToString()) : 0;
        //            //_recinvline.DiscountPercentage = xmlnode[i].ChildNodes.Item(7).Name.Trim() == "cac:AllowanceCharge" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(7).ChildNodes.Item(3).InnerText.ToString()) : 0;
        //            _recinvline.DiscountPercentage = 0;
        //            // _recinvline.DiscountAmount = xmlnode[i].ChildNodes.Item(7).Name.Trim() == "cac:AllowanceCharge" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(7).ChildNodes.Item(4).InnerText.ToString()) : 0;
        //            _recinvline.DiscountAmount = 0;
        //            _recinvline.SubAmount = xmlnode[i].ChildNodes.Item(2).Name.Trim() == "cbc:LineExtensionAmount" ? Convert.ToDouble(xmlnode[i].ChildNodes.Item(2).InnerText.ToString()) : 0;
        //            //_recinvline.LineNo = xmlnode[i].ChildNodes.Item(5).Name.Trim() == "cac:OrderLineReference" ? Convert.ToInt32(xmlnode[i].ChildNodes.Item(5).ChildNodes.Item(0).InnerText.ToString()) : 0;
        //            _recinvline.LineNo = (i + 1) * 1000;

        //            _invitemlist.Add(_recinvline);

        //        }
        //        _rechdr.ReceivedInvoiceLines = _invitemlist;

        //        ClsCommon.ExecuteSqlAnother("Insert into ReceivedInvoice (PeppolDocId, SendorIdentifier, ReceiverIdentifier, Type, CreationDateAndTime, InvoiceTypeCode, CurCode, InvNo, InvDt, DueDate, AccountingCost, BuyerRef, OrdNo, CustId, CustomerName, StreetName, CityName, PostalZone, CountryCode, ContactPerson, Email, DoDt, ShipAdd, ShipAdd2, ShipCity, ShipPin, PayTerms, GstAmt, TaxCategory, DoNo, GstPercentage, TaxScheme, SubTotal, Discount, TotalAmt) values (" +
        //            ClsCommon.SafeSql(_docid) + "," + ClsCommon.SafeSql(_rechdr.SendorIdentifier) + "," + ClsCommon.SafeSql(_rechdr.ReceivedIdentifier) + "," + ClsCommon.SafeSql(_rechdr.Type) + "," + ClsCommon.SafeSql(_rechdr.CreationDateAndTime) + "," + ClsCommon.SafeSql(_rechdr.InvoiceTypeCode) + "," + ClsCommon.SafeSql(_rechdr.DocumentCurrencyCode) + "," + ClsCommon.SafeSql(_rechdr.InvoiceNo) + "," + ClsCommon.SafeSql(Convert.ToDateTime(_rechdr.IssuedDate).ToString("yyyy-MM-dd HH:mm:ss")) + "," + ClsCommon.SafeSql(Convert.ToDateTime(_rechdr.DueDate).ToString("yyyy-MM-dd HH:mm:ss")) + "," +
        //            ClsCommon.SafeSql(_rechdr.AccoundingCost) + "," + ClsCommon.SafeSql(_rechdr.BuyerReference) + "," + ClsCommon.SafeSql(_rechdr.SalesOrderID) + "," + ClsCommon.SafeSql(_rechdr.CustomerID) + "," + ClsCommon.SafeSql(_rechdr.CustomerName) + "," + ClsCommon.SafeSql(_rechdr.StreetName) + "," + ClsCommon.SafeSql(_rechdr.CityName) + "," + ClsCommon.SafeSql(_rechdr.PostalZone) + "," + ClsCommon.SafeSql(_rechdr.CountryCode) + "," + ClsCommon.SafeSql(_rechdr.ContactPerson) + "," + ClsCommon.SafeSql(_rechdr.Email) + "," + ClsCommon.SafeSql(Convert.ToDateTime(_rechdr.ActualDeliveryDate).ToString("yyyy-MM-dd HH:mm:ss")) + "," + ClsCommon.SafeSql(_rechdr.ShipAdd) + "," +
        //            ClsCommon.SafeSql(_rechdr.ShipAdd2) + "," + ClsCommon.SafeSql(_rechdr.ShipCity) + "," + ClsCommon.SafeSql(_rechdr.ShipPin) + "," + ClsCommon.SafeSql(_rechdr.PaymentTerms) + "," + _rechdr.GstAmt + "," + ClsCommon.SafeSql(_rechdr.TaxCategory) + "," + ClsCommon.SafeSql(_rechdr.DeliveryOrderNo) + "," + _rechdr.GstPercentage + "," + ClsCommon.SafeSql(_rechdr.TaxScheme) + "," + _rechdr.SubTotal + "," + _rechdr.Discount + "," + _rechdr.TotalAmount + ")");

        //        foreach (ReceivedInvoiceLine _recLine in _rechdr.ReceivedInvoiceLines)
        //        {

        //            ClsCommon.ExecuteSqlAnother("Insert into ReceivedInvItem (InvNo, ItemNo, Description, [LineNo], UOM, UOM1, Qty, Price, DisPer, Discount, SubAmt, Remarks ) Values (" + ClsCommon.SafeSql(_invno) + "," + ClsCommon.SafeSql(_recLine.ItemNo) + "," + ClsCommon.SafeSql(_recLine.ItemName) + "," + _recLine.LineNo + "," + ClsCommon.SafeSql(_recLine.UOM) + ",(Select UOM from InvItem where invno = " + ClsCommon.SafeSql(_invno) + " and [LineNo] = " + _recLine.LineNo + " ), " + _recLine.Qty + "," + _recLine.Price + "," + _recLine.DiscountPercentage + "," + _recLine.DiscountAmount + "," + _recLine.SubAmount + "," + ClsCommon.SafeSql("") + ")");
        //        }

        //        ClsCommon.ExecuteSqlAnother("Insert into PeppolLog (LogDate,InvoiceNo, DocumentNo , FunctionName, Status, Exception) values (GetDate()," + ClsCommon.SafeSql("") + "," + ClsCommon.SafeSql(_docid) + ",'InboundInvoice'," + ClsCommon.SafeSql(responseStr) + "," + ClsCommon.SafeSql("") + ")");


        //        //ClsCommon.ExecuteSqlAnother("Update Invoice set PeppolDocId = " + ClsCommon.SafeSql(_docid) + ", PeppolStatus = " + ClsCommon.SafeSql("") + " where InvNo = " + ClsCommon.SafeSql(""));

        //        return "Success";
        //    }
        //    catch (Exception ex)
        //    {
        //        ClsCommon.ExecuteSqlAnother("Insert into PeppolLog (LogDate,InvoiceNo, DocumentNo , FunctionName, Status, Exception) values (GetDate()," + ClsCommon.SafeSql("") + "," + ClsCommon.SafeSql(_docid) + ",'InboundInvoice'," + ClsCommon.SafeSql("") + "," + ClsCommon.SafeSql(ex.Message.ToString()) + ")");
        //        return ex.Message.ToString();
        //    }
        //}

        //public static string Register(string _companyName, string _UEN, string _countryCode, string _contactNumber, string _contactEmail, string _address, string _postcode, string _authorizationletter, string _simplrcode, string _registrationNotification, string _imagepath)
        //{
        //    string _status = string.Empty;
        //    try
        //    {

        //        string JsonData = string.Empty;
        //        Int32 _isAuthorize = 0;
        //        JsonData = @"{ 'companyProfile' : { 'companyName': " + ClsCommon.SafeJSON(_companyName) + ", 'UEN' : " + ClsCommon.SafeJSON(_UEN) + ", 'countryCode' : " +
        //            ClsCommon.SafeJSON(_countryCode) + ", 'contactNumber' : " + ClsCommon.SafeJSON(_contactNumber) + ", 'contactEmail' : " +
        //            ClsCommon.SafeJSON(_contactEmail) + ", 'address' : " + ClsCommon.SafeJSON(_address) + ", 'postCode' : " + ClsCommon.SafeJSON(_postcode) +
        //            "}, 'authLetterBase64' : " + ClsCommon.SafeJSON(_authorizationletter) + ", 'registrationNotification' : " + ClsCommon.SafeJSON(_registrationNotification) + " }";
        //        string js1 = JsonData.Replace("'", "\"");
        //        js1 = js1.Replace("!", "\'");
        //        if (ClsCommon.VerifyCompanyName(_companyName))
        //        {
        //            return "Compnay name already exists";
        //        }
        //        if (ClsCommon.VerifyEmailId(_contactEmail))
        //        {
        //            return "Email Id already exists";
        //        }
        //        if (ClsCommon.VerifyUEN(_UEN))
        //        {
        //            return "UEN already exists";
        //        }
        //        if (string.IsNullOrEmpty(_simplrcode))
        //        {
        //            return "SimplrCode is not empty";
        //        }
        //        if (ClsCommon.VerifyRegistrationNotification(_registrationNotification))
        //        {
        //            return "RegistrationNotification already exists";
        //        }
        //        if (string.IsNullOrEmpty(_authorizationletter))
        //        {
        //            _isAuthorize = 1;
        //            _imagepath = string.Empty;
        //        }
        //        string baseAddress = "https://api.ap-partners.dev.einvoice.sg";
        //        //string baseAddress = "https://api.ap-connect.einvoice.sg";
        //        string pathURL = "/v1/register";

        //        HttpWebRequest request = (HttpWebRequest)WebRequest.Create(baseAddress + pathURL);
        //        request.ContentType = "application/json; charset=utf-8";
        //        //request.Headers.Add("api_key", "rt_i8aOrnXA84rNdzqHcvQICqqWgvN3Wk3h");
        //        request.Headers.Add("api_key", "t_27gA2xSjyFLM2ST68L6bARzIZk4peaN6");
        //        //request.Headers.Add("api_key", "k_37and7AifVoKvkTeLfG3njOExW8JvAyb");  
        //        //request.Headers.Add("api_key", "rk_Ws3wkF06Ph4QltYdfAiDfC0f3373jgAf");
        //        request.Method = "POST";
        //        request.KeepAlive = true;
        //        request.Accept = "application/json";
        //        //request.HaveResponse;
        //        StreamWriter _streamWriter = new StreamWriter(request.GetRequestStream(), Encoding.UTF8);
        //        _streamWriter.Write(js1.ToString());
        //        _streamWriter.Close();

        //        try
        //        {
        //            HttpWebResponse response;
        //            response = (HttpWebResponse)request.GetResponse();
        //            if (response.StatusCode == HttpStatusCode.OK)
        //            {
        //                Stream responseStream = response.GetResponseStream();
        //                string responseStr = new StreamReader(responseStream).ReadToEnd();
        //                RegisterResponse _result = JsonConvert.DeserializeObject<RegisterResponse>(responseStr);
        //                _status = _result.Status;
        //                ClsCommon.ExecuteSqlAnother("Insert into PeppolRegister (CompanyName, UEN, CountryCode , ContactNumber, ContactEmail, Address, PostCode, AuthorizationLetter, PeppolStatus, PeppolID, SimplrCode, DTG, RegistrationNotification, Authorize, Image ) values (" + ClsCommon.SafeSql(_companyName) + "," + ClsCommon.SafeSql(_UEN) + "," + ClsCommon.SafeSql(_countryCode) + "," + ClsCommon.SafeSql(_contactNumber) + "," + ClsCommon.SafeSql(_contactEmail) + "," + ClsCommon.SafeSql(_address) + "," + ClsCommon.SafeSql(_postcode) + "," + ClsCommon.SafeSql(_authorizationletter) + "," + ClsCommon.SafeSql(_status) + ", ''," + ClsCommon.SafeSql(_simplrcode) + ", Getdate() " + ", " + ClsCommon.SafeSql(_registrationNotification) + "," + _isAuthorize + "," + ClsCommon.SafeSql(_imagepath) + ")");
        //                ClsCommon.ExecuteSqlAnother("Insert into PeppolLog (LogDate,InvoiceNo, DocumentNo , FunctionName, Status, Exception) values (GetDate()," + ClsCommon.SafeSql(_companyName) + "," + ClsCommon.SafeSql(_status) + ",'PeppolRegistration'," + ClsCommon.SafeSql(responseStr) + "," + ClsCommon.SafeSql("") + ")");
        //            }
        //            return _status.ToString();
        //        }
        //        catch (WebException webex)
        //        {
        //            if (webex.Status == WebExceptionStatus.ProtocolError)
        //            {
        //                throw;
        //            }
        //            return webex.Status.ToString();
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        return ex.Message.ToString();
        //    }
        //}


    }

  public  class InboundResponse
    {
        public string DocId { get; set; }
        public string ReceivedAt { get; set; }
        public string InvoiceFileURL { get; set; }
        public string EvidenceFileUrl { get; set; }
        public string ExpiresAt { get; set; }
    }


}