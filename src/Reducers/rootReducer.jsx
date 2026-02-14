import { combineReducers } from '@reduxjs/toolkit'

import authReducer from '../Slices/Auth'
import profileReducer from '../Slices/Profile'
import CourseReducer from '../Slices/Courses'
import CategoryReducer from '../Slices/Categories'
import SectionReducer from '../Slices/Section'
import SubSectionReducer from '../Slices/SubSection'
import CartReducer from '../Slices/Cart'
import walkInReducer from '../Slices/WalkInSlice'
import expenseReducer from "../Slices/expenseSlice";
// import { testimonialReducer } from '../Slices/TestimonialSlice'
import { testimonialReducer } from "../Slices/testimonialSlice"

export const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    Course:CourseReducer,
    Category:CategoryReducer,
    section:SectionReducer,
    subsection:SubSectionReducer,
    cart : CartReducer,
    walkIn: walkInReducer,
    expense: expenseReducer,
    testimonial: testimonialReducer,
})