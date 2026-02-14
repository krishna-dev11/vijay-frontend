const initialState = {
  testimonials: [],
  pagination: {},
};

export const testimonialReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TESTIMONIALS":
      return {
        ...state,
        testimonials: action.payload.testimonials,
        pagination: {
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          totalTestimonials: action.payload.totalTestimonials,
        },
      };

    case "DELETE_TESTIMONIAL":
      return {
        ...state,
        testimonials: state.testimonials.filter(
          (t) => t._id !== action.payload
        ),
      };

    default:
      return state;
  }
};
