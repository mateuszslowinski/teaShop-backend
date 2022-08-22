
export class ValidationError extends Error {}
export class NotFoundError extends Error{}

export const handleError = (err, req, res, next) => {
    console.error(err);
    res
        .status(err instanceof ValidationError ? 400 : 500 || err instanceof  NotFoundError ? 404: 500)
        .json({
            message: err instanceof ValidationError || NotFoundError ? err.message : 'Przepraszamy, spróbuj ponownie' +
                ' za kilka minut',
        });
}