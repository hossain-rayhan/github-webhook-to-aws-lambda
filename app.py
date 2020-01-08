from aws_cdk import (
    aws_lambda as lambda_,
    aws_lambda_event_sources as event_sources,
    core,
)


class LambdaWithApiTrigger(core.Stack):
    def __init__(self, app: core.App, id: str) -> None:
        super().__init__(app, id)

        # Create the lambda Function
        lambdaFn = lambda_.Function(
            self, 'GitHubToChime',
            handler='index.handler',
            code=lambda_.Code.from_asset(path='lambda_code'),
            runtime=lambda_.Runtime.NODEJS_12_X,
        )

        api_source = event_sources.ApiEventSource(method='ANY', path='/')

        # Attach AWS API Gateway source to the lambda function
        lambdaFn.add_event_source(api_source)


app = core.App()
LambdaWithApiTrigger(app, "git-to-chime")
app.synth()
