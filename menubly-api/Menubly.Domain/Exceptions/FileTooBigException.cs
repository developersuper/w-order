namespace Menubly.Domain.Exceptions
{
    public class FileTooBigException : BadRequestException
    {
        public FileTooBigException(string fileName)
            : base($"The file {fileName} is too large ... discontinue processing the file!")
        {
            //
        }
    }
}
