import {Product} from "../Models/Product.js";
import {NotFoundError, ValidationError} from "../utils/error.js";
import {ReviewSchema} from "../Models/Review.js";
import {validateLength} from "../utils/validation.js";

// ADD SINGLE PRODUCT REVIEW
export const addProductReview = async (req, res) => {
    const {rating, comment} = req.body
    validateLength(comment, 300, "Opis nie może być dłuższy niż 300 znaków, ani być pusty.")

    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReview = product.reviews.find(x => x.user.toString() === req.user._id.toString()
        )
        if (alreadyReview) {
            throw new ValidationError('Podany produkt już zrecenzowany')
        }

        const review = await new ReviewSchema({
            username: req.user.username,
            rating: Number(rating),
            comment: comment,
            user: req.user._id,
        }).save()

        product.reviews.push(review);
        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((prev, curr) => curr.rating + prev, 0) / product.reviews.length;

        await product.save()
        res.status(201).json({message: "Recenzja została dodana"});

    } else {
        throw new NotFoundError('Nie znaleziono psroduktu');
    }
}

//REMOVE PRODUCT REVIEW
export const removeReview = async (req, res) => {
    const product = await Product.findById(req.params.id)
    const {rating, productId, review_id} = req.body;


    if (!product) {
        throw new NotFoundError('Produkt nie znaleziono');
    }
    if (!rating || rating <= 0 || rating > 5) {
        throw new ValidationError('Ocena nie moze być puta ani mniejsza od 0 i większa od 5');
    }
    if (!review_id || typeof review_id !== "string") {
        throw new ValidationError('Id recenzji nie może być puste ani i musi być typu string');
    }
    if (!productId || typeof productId !== "string") {
        throw new ValidationError('Id produktu nie może być puste ani i musi być typu string');
    }

    try {
        let newRating;
        let newNumReviews;
        if (product.reviews.length === 1) {
            newRating = 0;
            newNumReviews = 0
        } else {
            newRating = (product.reviews.reduce((prev, curr) => (curr.rating) + prev, 0) - rating) / (product.reviews.length - 1)
            newNumReviews = --product.numReviews;
        }
        const newReviews = product.reviews.filter((review) => review.user.toString() !== productId)

        await Product.findOneAndUpdate({_id: req.params.id}, {
            reviews: newReviews,
            numReviews: newNumReviews,
            rating: newRating
        })

        await ReviewSchema.findByIdAndDelete(review_id);
        res.status(200).json({message: "Usunięto pomyślnie recenzje."});
    } catch (e) {
        throw new ValidationError(e.message)
    }

}