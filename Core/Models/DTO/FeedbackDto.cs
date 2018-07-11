using System.Collections.Generic;
using Core.Models.DomainModels;

namespace Core.Models.DTO
{
    public class FeedbackDto
    {
        public string Id { get; set; }

        public string UserName { get; set; }

        public string UserLastName { get; set; }

        public string UserId { get; set; }

        public List<SubFeedbackDto> SubFeedbacks { get; set; }

        public string Body { get; set; }

        public long Date { get; set; }
    }
}
