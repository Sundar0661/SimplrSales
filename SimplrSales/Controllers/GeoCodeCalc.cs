using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimplrSales.Controllers
{
    public class GeoCodeCalc
    {
        public const double EarthRadiusInMiles = 3956.0D;
        public const double EarthRadiusInKilometers = 6367.0D;
        public static double ToRadian(double val)
        {
            return val * (Math.PI / 180);
        }
        public  double DiffRadian(double val1, double val2)
        {
            return ToRadian(val2) - ToRadian(val1);
        }
        /// <summary>
        ///     ''' Calculate the distance between two geocodes. Defaults to using Miles.
        ///     ''' </summary>
        public  double CalcDistance(double lat1, double lng1, double lat2, double lng2)
        {
            return CalcDistance(lat1, lng1, lat2, lng2, GeoCodeCalcMeasurement.Kilometers);
        }

        /// <summary>
        ///     ''' Calculate the distance between two geocodes.
        ///     ''' </summary>
        public  double CalcDistance(double lat1, double lng1, double lat2, double lng2, GeoCodeCalcMeasurement m)
        {
            double radius = GeoCodeCalc.EarthRadiusInMiles;
            if (m == GeoCodeCalcMeasurement.Kilometers)
                radius = GeoCodeCalc.EarthRadiusInKilometers;
            return radius * 2 * Math.Asin(Math.Min(1, Math.Sqrt((Math.Pow(Math.Sin((DiffRadian(lat1, lat2)) / 2.0D), 2.0D) + Math.Cos(ToRadian(lat1)) * Math.Cos(ToRadian(lat2)) * Math.Pow(Math.Sin((DiffRadian(lng1, lng2)) / 2.0D), 2.0D)))));
        }
    }

    public enum GeoCodeCalcMeasurement : int
    {
        Miles = 0,
        Kilometers = 1
    }

}


