using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Menubly.Api.Extensions
{
    internal class FileUploadValidateAttribute : ValidationAttribute
    {
        public FileUploadValidateAttribute()
        {

        }

        private static string GetFileExtensionErrorMessage(string extension) => $"The selected file type ({extension}) is not allowed!";
        private static string GetFileSizeErrorMessage(long size) => $"The file size ({size}) exceeded the maximum allowed size!";

        protected override ValidationResult? IsValid(
        object? value, ValidationContext validationContext)
        {
            var uploadingFile = (IFormFile)validationContext.ObjectInstance;
            var extension = Path.GetExtension(uploadingFile.FileName).ToLower();

            if (uploadingFile.Length > 10485760)
            {
                return new ValidationResult(GetFileSizeErrorMessage(uploadingFile.Length));
            }

            if (extension != ".png")
            {
                return new ValidationResult(GetFileExtensionErrorMessage(Path.GetFileName(extension)));
            }

            return ValidationResult.Success;
        }
    }
}
