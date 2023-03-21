namespace Menubly.Domain.Exceptions
{
    public class CategoryNotFoundException : NotFoundException
    {
        public CategoryNotFoundException(Guid categoryId)
            : base($"Category with ID {categoryId} was not found!")
        {
            //
        }
    }
}
