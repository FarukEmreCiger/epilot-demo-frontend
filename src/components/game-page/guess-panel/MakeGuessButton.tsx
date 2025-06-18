import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Tooltip } from "@mui/material";

interface MakeGuessProps {
  onMakeGuess: () => void | Promise<void>;
  disabled?: boolean;
}

export const MakeGuessButton: React.FC<MakeGuessProps> = ({
  onMakeGuess,
  disabled,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleMakeGuess = async () => {
    setIsLoading(true);

    try {
      await onMakeGuess();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tooltip title={disabled ? "Make a selection first!" : ""}>
      <span>
        <LoadingButton
          onClick={handleMakeGuess}
          loading={isLoading}
          loadingPosition="start"
          startIcon={<span>⚡</span>}
          disabled={disabled}
          className="btn-guess"
          variant="contained"
        >
          {isLoading ? "Making Guess..." : "Make Guess"}
        </LoadingButton>
      </span>
    </Tooltip>
  );
};
