import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';

it('renders without crashing', () => {
  render(<Carousel />);
});

it('matches snapshot', () => {
    const { asFragment } = render(<Carousel />);
    expect(asFragment()).toMatchSnapshot();
});

it("handles arrow clicks", function() {
    const { getByText, getByTestId } = render(<Carousel />);
    const dataTestid = getByText("Photo by Richard Pasquarella on Unsplash");
  
    // first image and caption displayed on startup
    expect(dataTestid).toHaveTextContent("Photo by Richard Pasquarella on Unsplash");

    // click on the right arrow
    fireEvent.click(getByTestId("right-arrow"));
  
    // is the caption different, second caption displayed?
    expect(dataTestid).toHaveTextContent("Photo by Pratik Patel on Unsplash");
    expect(dataTestid).not.toHaveTextContent("Photo by Richard Pasquarella on Unsplash");

    // click on the right arrow again
    fireEvent.click(getByTestId("right-arrow"));

    // is the caption different, third caption displayed?
    expect(dataTestid).toHaveTextContent("Photo by Josh Post on Unsplash");
    expect(dataTestid).not.toHaveTextContent("Photo by Pratik Patel on Unsplash");

    // click on the left arrow
    fireEvent.click(getByTestId("left-arrow"));

    // is the caption different, second caption displayed again?
    expect(dataTestid).toHaveTextContent("Photo by Pratik Patel on Unsplash");
    expect(dataTestid).not.toHaveTextContent("Photo by Josh Post on Unsplash");

    // click on the left arrow again
    fireEvent.click(getByTestId("left-arrow"));

    // is the caption different, first caption displayed again?
    expect(dataTestid).toHaveTextContent("Photo by Richard Pasquarella on Unsplash");
    expect(dataTestid).not.toHaveTextContent("Photo by Pratik Patel on Unsplash");

});

it("hides arrows at the ends", function() {
    const { getByTestId } = render(<Carousel />);
    const leftArrow = getByTestId("left-arrow")
    const rightArrow = getByTestId("right-arrow")

    // is the left arrow hidden and the right arrow visible when first image is displayed on startup?
    expect(leftArrow).toHaveClass("Carousel-arrow-hidden");
    expect(rightArrow).toHaveClass("fas fa-chevron-circle-right fa-2x");

    // click on the right arrow
    fireEvent.click(getByTestId("right-arrow"));
    // are both arrows visible?
    expect(leftArrow).toHaveClass("fas fa-chevron-circle-left fa-2x");
    expect(rightArrow).toHaveClass("fas fa-chevron-circle-right fa-2x");

    // click on the right arrow again
    fireEvent.click(getByTestId("right-arrow"));
    // is the left arrow visible and the right arrow hidden?
    expect(leftArrow).toHaveClass("fas fa-chevron-circle-left fa-2x");
    expect(rightArrow).toHaveClass("Carousel-arrow-hidden");

    // click on the left arrow
    fireEvent.click(getByTestId("left-arrow"));
    // are both arrows visible?
    expect(leftArrow).toHaveClass("fas fa-chevron-circle-left fa-2x");
    expect(rightArrow).toHaveClass("fas fa-chevron-circle-right fa-2x");
    
});
