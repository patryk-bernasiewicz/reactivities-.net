using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Update
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Command>
        {
            private readonly DataContext _context = context;
            private readonly IMapper _mapper = mapper;
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var existingActivity = await _context.Activities.FindAsync(request.Activity.Id);

                if (existingActivity is null)
                {
                    return;
                }

                _mapper.Map(request.Activity, existingActivity);

                await _context.SaveChangesAsync();
            }
        }
    }
}