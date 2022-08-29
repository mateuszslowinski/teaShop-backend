import {Product} from "../Models/Product.js";
import {NotFoundError, ValidationError} from "../utils/error.js";
import {ReviewSchema} from "../Models/Review.js";

export const productReview = async (req, res) => {

    const {rating, comment} = req.body

    if(comment.length >300) {
        throw new ValidationError('Opis nie może być dłuższy niż 300 znaków')
    }

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
        res.status(201).json({message:"Recenzja została dodana"});

    } else {
        throw new NotFoundError('Nie znaleziono psroduktu');
    }
}