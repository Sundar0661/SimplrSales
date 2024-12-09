using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Code128
{
    public class Code128Encode
    {
        private string BarcodeEncode(string value)
        {
            int[] overChars = { 8216, 8217, 8220, 8221, 8226, 8211, 8212, 732, 8364 };
            char[] valueChars = value.ToCharArray();
            int[] checksumVals = new int[value.Length];

            for (int n = 0; n < valueChars.Length; n++)
            {
                checksumVals[n] = (((byte)valueChars[n]) - 32) * (n + 1);
            }

            int checksum = checksumVals.Sum() % 103;
            char check = (char)(checksum + 33);
            if (checksum > 93)
                check = (char)overChars[checksum - 94];

            string start = ((char)353).ToString();
            string stop = ((char)339).ToString();

            return start + value + check.ToString() + stop;
        }

    }
}
